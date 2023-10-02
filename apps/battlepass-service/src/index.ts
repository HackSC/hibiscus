import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { createClient } from '@supabase/supabase-js';

export type Bindings = {
    HIBISCUS_SUPABASE_SERVICE_KEY: string;
    NEXT_PUBLIC_HIBISCUS_SUPABASE_API_URL: string;
};

const HTTP_BAD_REQUEST = 400;
const INTERNAL_SERVER_ERROR = 500;

const app = new Hono<{ Bindings: Bindings }>();

app.use('/api/*', cors());

app.get('/api/leaderboard', async (c) => {
    try {
        const supabase = createClient(
            c.env.NEXT_PUBLIC_HIBISCUS_SUPABASE_API_URL,
            c.env.HIBISCUS_SUPABASE_SERVICE_KEY
        );      

        const pageNumber = parseInt(c.req.query("pageNumber") ?? "");
        const pageSize = parseInt(c.req.query("pageSize") ?? "");

        if (isNaN(pageNumber) || isNaN(pageSize) || pageNumber < 1 || pageSize < 1) {
            return c.json({
                error: 'INVALID_QUERY_PARAMS',
                message: 'Please provide valid pageNumber and pageSize.',
            }, HTTP_BAD_REQUEST);
        }

        const { data, error } = await supabase
            .from('leaderboard')
            .select(`
                bonus_points,
                event_points,
                total_points,
                user_profiles(
                    first_name,
                    last_name
                )
                `)
                .order('total_points', {ascending: false})
                .range((pageNumber - 1) * pageSize, pageNumber * pageSize - 1)

        if (error) {
            return c.json({ error: error.message }, INTERNAL_SERVER_ERROR);
        }

        return c.json({
            data: {
                pageNumber: pageNumber,
                pageCount: pageSize,
                leaderboard: data
            }
        });
    } catch (e) {
        if(e instanceof Error){
            console.error("Error:", e.message); // Extract and log the error message.
        }
        return c.json(
            {
                error: 'UNKNOWN_ERROR',
                message: 'An unknown error occurred.',
            },
            INTERNAL_SERVER_ERROR
        );
    }
});

export default app;
