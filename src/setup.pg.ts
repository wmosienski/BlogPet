import { pg } from "@Database/pg/pg";
import { QueryFile } from "pg-promise";

const proceduresPath = '../database/';

function sql(name: string): QueryFile {
    return new QueryFile(`${proceduresPath}${name}`, {minify: true});
}

export const setupPG = async () => {
    try {
        await pg().none(sql('tables/country.table.sql'));
        await pg().none(sql('tables/user.table.sql'));
        await pg().none(sql('tables/token.table.sql'));
        await pg().none(sql('tables/author.table.sql'));
        await pg().none(sql('tables/blog.table.sql'));
        await pg().none(sql('tables/post.table.sql'));
        await pg().none(sql('tables/post-post-ref.table.sql'));

        await pg().none(sql('functions/country/create.sql'));
        await pg().none(sql('functions/author/create.sql'));
        await pg().none(sql('functions/blog/create.sql'));
        await pg().none(sql('functions/post/create.sql'));
        await pg().none(sql('functions/user/create.sql'));

        await pg().none(sql('functions/country/read.sql'));
        await pg().none(sql('functions/author/read.sql'));
        await pg().none(sql('functions/blog/read.sql'));
        await pg().none(sql('functions/post/read.sql'));
        await pg().none(sql('functions/user/read.sql'));

        await pg().none(sql('procedures/country/update.sql'));
        await pg().none(sql('procedures/author/update.sql'));
        await pg().none(sql('procedures/blog/update.sql'));
        await pg().none(sql('procedures/post/update.sql'));
        await pg().none(sql('procedures/user/update.sql'));

        await pg().none(sql('procedures/country/delete.sql'));
        await pg().none(sql('procedures/author/delete.sql'));
        await pg().none(sql('procedures/blog/delete.sql'));
        await pg().none(sql('procedures/post/delete.sql'));
        await pg().none(sql('procedures/user/delete.sql'));

        await pg().none(sql('procedures/token/delete.sql'));
        await pg().none(sql('procedures/token/delete_by_value.sql'));
        await pg().none(sql('procedures/token/delete_by_user_id.sql'));
        await pg().none(sql('functions/token/create.sql'));
        await pg().none(sql('functions/token/find_by_user_id.sql'));
        await pg().none(sql('functions/token/find_by_value.sql'));

        await pg().none(sql('functions/user/find_by_email.sql'));

    } catch(error) {
        console.log(error);
    }


}
