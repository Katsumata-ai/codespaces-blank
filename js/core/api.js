// Gestionnaire d'API pour Dafnck Army
class ApiManager {
    constructor() {
        this.supabase = window.supabaseClient;
        this.state = window.appState;
        this.cache = new Map();
        this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
    }
    
    // Méthodes génériques pour Supabase
    async select(table, options = {}) {
        try {
            let query = this.supabase.from(table).select(options.select || '*');
            
            // Appliquer les filtres
            if (options.filters) {
                Object.entries(options.filters).forEach(([key, value]) => {
                    if (value !== null && value !== undefined) {
                        query = query.eq(key, value);
                    }
                });
            }
            
            // Appliquer l'ordre
            if (options.orderBy) {
                query = query.order(options.orderBy.column, { 
                    ascending: options.orderBy.ascending !== false 
                });
            }
            
            // Appliquer la limite
            if (options.limit) {
                query = query.limit(options.limit);
            }
            
            const { data, error } = await query;
            if (error) throw error;
            
            return { success: true, data };
        } catch (error) {
            console.error(`Error selecting from ${table}:`, error);
            return { success: false, error: error.message };
        }
    }
    
    async insert(table, data) {
        try {
            const { data: result, error } = await this.supabase
                .from(table)
                .insert(data)
                .select()
                .single();
            
            if (error) throw error;
            
            return { success: true, data: result };
        } catch (error) {
            console.error(`Error inserting into ${table}:`, error);
            return { success: false, error: error.message };
        }
    }
    
    async update(table, id, data) {
        try {
            const { data: result, error } = await this.supabase
                .from(table)
                .update(data)
                .eq('id', id)
                .select()
                .single();
            
            if (error) throw error;
            
            return { success: true, data: result };
        } catch (error) {
            console.error(`Error updating ${table}:`, error);
            return { success: false, error: error.message };
        }
    }
    
    async delete(table, id) {
        try {
            const { error } = await this.supabase
                .from(table)
                .delete()
                .eq('id', id);
            
            if (error) throw error;
            
            return { success: true };
        } catch (error) {
            console.error(`Error deleting from ${table}:`, error);
            return { success: false, error: error.message };
        }
    }
    
    // Méthodes spécifiques aux campagnes
    async getCampaigns(filters = {}) {
        const cacheKey = `campaigns_${JSON.stringify(filters)}`;
        
        // Vérifier le cache
        if (this.cache.has(cacheKey)) {
            const cached = this.cache.get(cacheKey);
            if (Date.now() - cached.timestamp < this.cacheTimeout) {
                return { success: true, data: cached.data };
            }
        }
        
        const result = await this.select('campaigns', {
            select: `
                *,
                company:company_id(email),
                submissions_count:submissions(count)
            `,
            filters,
            orderBy: { column: 'created_at', ascending: false }
        });
        
        // Mettre en cache
        if (result.success) {
            this.cache.set(cacheKey, {
                data: result.data,
                timestamp: Date.now()
            });
        }
        
        return result;
    }
    
    async createCampaign(campaignData) {
        const user = this.state.getState('user');
        if (!user) {
            return { success: false, error: 'Utilisateur non connecté' };
        }
        
        const data = {
            ...campaignData,
            company_id: user.id,
            budget_remaining: campaignData.budget_total,
            status: 'draft'
        };
        
        const result = await this.insert('campaigns', data);
        
        // Invalider le cache des campagnes
        this.clearCampaignsCache();
        
        return result;
    }
    
    // Méthodes spécifiques aux soumissions
    async getSubmissions(filters = {}) {
        return await this.select('submissions', {
            select: `
                *,
                campaign:campaign_id(title, cpm_rate),
                creator:creator_id(email),
                latest_stats:video_stats(views, likes, comments, scraped_at)
            `,
            filters,
            orderBy: { column: 'submitted_at', ascending: false }
        });
    }
    
    async createSubmission(submissionData) {
        const user = this.state.getState('user');
        if (!user) {
            return { success: false, error: 'Utilisateur non connecté' };
        }
        
        const data = {
            ...submissionData,
            creator_id: user.id,
            status: 'pending'
        };
        
        return await this.insert('submissions', data);
    }
    
    async updateSubmissionStatus(submissionId, status, comment = null) {
        const data = { status };
        if (comment) data.comment = comment;
        if (status === 'approved') data.approved_at = new Date().toISOString();
        if (status === 'validated') data.validated_at = new Date().toISOString();
        
        return await this.update('submissions', submissionId, data);
    }
    
    // Méthodes spécifiques aux paiements
    async getPayments(filters = {}) {
        return await this.select('payments', {
            select: `
                *,
                submission:submission_id(video_url),
                campaign:campaign_id(title),
                creator:creator_id(email)
            `,
            filters,
            orderBy: { column: 'created_at', ascending: false }
        });
    }
    
    async createPayment(paymentData) {
        return await this.insert('payments', paymentData);
    }
    
    // Méthodes spécifiques aux utilisateurs - DEPRECATED: Use the new updateUserProfile method below
    
    // Méthodes de cache
    clearCache() {
        this.cache.clear();
    }
    
    clearCampaignsCache() {
        for (const key of this.cache.keys()) {
            if (key.startsWith('campaigns_')) {
                this.cache.delete(key);
            }
        }
    }
    
    // Méthodes d'Edge Functions
    async callEdgeFunction(functionName, payload = {}) {
        try {
            const { data, error } = await this.supabase.functions.invoke(functionName, {
                body: payload
            });
            
            if (error) throw error;
            
            return { success: true, data };
        } catch (error) {
            console.error(`Error calling edge function ${functionName}:`, error);
            return { success: false, error: error.message };
        }
    }
    
    // Validation de soumission
    async validateSubmission(submissionId) {
        return await this.callEdgeFunction('validate-submission', {
            submissionId
        });
    }
    
    // Traitement des paiements
    async processPayment(submissionId, amount) {
        return await this.callEdgeFunction('stripe-payments', {
            action: 'process_payment',
            submissionId,
            amount
        });
    }
    
    // Création de session Stripe
    async createStripeSession(type, data) {
        return await this.callEdgeFunction('stripe-payments', {
            action: type === 'checkout' ? 'create_payment_intent' : 'create_connect_account',
            ...data
        });
    }
    
    // Méthodes de statistiques
    async getStats(type, filters = {}) {
        const cacheKey = `stats_${type}_${JSON.stringify(filters)}`;
        
        // Vérifier le cache
        if (this.cache.has(cacheKey)) {
            const cached = this.cache.get(cacheKey);
            if (Date.now() - cached.timestamp < this.cacheTimeout) {
                return { success: true, data: cached.data };
            }
        }
        
        let result;
        
        switch (type) {
            case 'dashboard':
                result = await this.getDashboardStats(filters);
                break;
            case 'campaign':
                result = await this.getCampaignStats(filters.campaignId);
                break;
            default:
                result = { success: false, error: 'Type de statistiques non supporté' };
        }
        
        // Mettre en cache
        if (result.success) {
            this.cache.set(cacheKey, {
                data: result.data,
                timestamp: Date.now()
            });
        }
        
        return result;
    }
    
    async getDashboardStats(filters) {
        const user = this.state.getState('user');
        const userRole = this.state.getState('userRole');
        
        if (!user) {
            return { success: false, error: 'Utilisateur non connecté' };
        }
        
        try {
            if (userRole === 'startup') {
                // Stats pour startup
                const campaigns = await this.getCampaigns({ company_id: user.id });
                const submissions = await this.getSubmissions();
                const payments = await this.getPayments({ campaign_id: campaigns.data?.map(c => c.id) });
                
                return {
                    success: true,
                    data: {
                        totalCampaigns: campaigns.data?.length || 0,
                        totalBudget: campaigns.data?.reduce((sum, c) => sum + c.budget_total, 0) || 0,
                        totalSpent: payments.data?.reduce((sum, p) => sum + p.amount, 0) || 0,
                        totalSubmissions: submissions.data?.length || 0
                    }
                };
            } else {
                // Stats pour créateur
                const submissions = await this.getSubmissions({ creator_id: user.id });
                const payments = await this.getPayments({ creator_id: user.id });
                
                return {
                    success: true,
                    data: {
                        totalSubmissions: submissions.data?.length || 0,
                        totalEarnings: payments.data?.reduce((sum, p) => sum + p.amount, 0) || 0,
                        approvedSubmissions: submissions.data?.filter(s => s.status === 'approved').length || 0,
                        pendingSubmissions: submissions.data?.filter(s => s.status === 'pending').length || 0
                    }
                };
            }
        } catch (error) {
            console.error('Error getting dashboard stats:', error);
            return { success: false, error: error.message };
        }
    }
    
    async getCampaignStats(campaignId) {
        try {
            const submissions = await this.getSubmissions({ campaign_id: campaignId });
            const payments = await this.getPayments({ campaign_id: campaignId });

            return {
                success: true,
                data: {
                    totalSubmissions: submissions.data?.length || 0,
                    approvedSubmissions: submissions.data?.filter(s => s.status === 'approved').length || 0,
                    totalViews: submissions.data?.reduce((sum, s) => sum + (s.latest_stats?.[0]?.views || 0), 0) || 0,
                    totalSpent: payments.data?.reduce((sum, p) => sum + p.amount, 0) || 0
                }
            };
        } catch (error) {
            console.error('Error getting campaign stats:', error);
            return { success: false, error: error.message };
        }
    }

    async updateUserProfile(profileData) {
        try {
            const user = await this.supabase.auth.getUser();
            console.log('🔧 Auth check:', {
                user: user?.data?.user,
                userId: user?.data?.user?.id,
                email: user?.data?.user?.email
            });

            if (!user?.data?.user) {
                throw new Error('User not authenticated');
            }

            // Get user role from state
            const userRole = this.state.getState('userRole');
            console.log('🔧 User role from state:', userRole);

            if (!userRole) {
                throw new Error('User role not found');
            }

            // Determine table and fields based on user role
            let tableName, updateData;

            if (userRole === 'startup') {
                tableName = 'startup_profiles';
                updateData = {
                    first_name: profileData.firstName,
                    last_name: profileData.lastName,
                    country: profileData.country,
                    company_name: profileData.companyName,
                    industries: profileData.industries,
                    product_link: profileData.productLink,
                    profile_completed: true,
                    updated_at: new Date().toISOString()
                };
            } else {
                tableName = 'creator_profiles';
                updateData = {
                    first_name: profileData.firstName,
                    last_name: profileData.lastName,
                    country: profileData.country,
                    creator_name: profileData.creatorName,
                    niche: profileData.niche,
                    platforms: profileData.platforms,
                    followers_range: profileData.followers,
                    description: profileData.description,
                    profile_completed: true,
                    updated_at: new Date().toISOString()
                };
            }

            console.log('🔧 Updating profile:', {
                userId: user.data.user.id,
                userRole,
                tableName,
                updateData
            });

            // Use upsert to handle both insert and update cases
            const { data, error } = await this.supabase
                .from(tableName)
                .upsert({
                    id: user.data.user.id,
                    ...updateData
                })
                .select();

            if (error) {
                console.error('🔧 Supabase error:', error);
                throw error;
            }

            console.log('✅ Profile updated successfully:', data);
            return { success: true, data };
        } catch (error) {
            console.error('Error updating user profile:', error);
            return { success: false, error: error.message };
        }
    }

    async getUserProfile() {
        try {
            const user = await this.supabase.auth.getUser();
            if (!user?.data?.user) {
                throw new Error('User not authenticated');
            }

            const { data, error } = await this.supabase
                .from('profiles')
                .select('*')
                .eq('id', user.data.user.id)
                .single();

            if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
                throw error;
            }

            return { success: true, data: data || null };
        } catch (error) {
            console.error('Error getting user profile:', error);
            return { success: false, error: error.message };
        }
    }
}

// Instance globale
window.apiManager = new ApiManager();

console.log('🔧 API Manager loaded');
