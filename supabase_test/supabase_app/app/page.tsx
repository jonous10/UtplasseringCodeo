import { createClient } from '@/utils/supabase/server';

  export default async function Users() {
    const supabase = await createClient();
    const { data: users } = await supabase.from("users").select();

    return <div>
      <div>
        <input></input>
      </div>
        <pre>
          {JSON.stringify((users), null, 2)}
        </pre>
      </div>;
  }