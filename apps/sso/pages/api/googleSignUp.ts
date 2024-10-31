import { HibiscusSupabaseClient } from '@hibiscus/hibiscus-supabase-client';
import { NextApiHandler } from 'next';
import { container } from 'tsyringe';

const handler: NextApiHandler = async (req, res) => {
    if (req.method === 'POST') {
        try {
            const supabase = container.resolve(HibiscusSupabaseClient);
            supabase.setOptions({ useServiceKey: true });
            const { email, first_name, last_name, user_id } = JSON.parse(req.body);
            console.log(req.body);
            console.log(req.body['email']);
            console.log(email, first_name, last_name);
            const { data, error } = await supabase.getClient().from('user_profiles').insert([
                {
                    user_id,
                    email,
                    first_name,
                    last_name,
                },
            ]);
            console.log(data, error);
            res.status(200).json({ data, error });
        } catch (error) {
            res.status(500).json({ error });
        }
    }
};

export default handler;
