import { pg } from "@Database/pg/pg";
import { QueryFile } from "pg-promise";

const proceduresPath = '../database/';

function sql(name: string): QueryFile {
    return new QueryFile(`${proceduresPath}${name}`, {minify: true});
}

export const setupPG = async () => {
    try {
        await pg().none(sql('tables/country.table.sql'),[]);
        await pg().none(sql('tables/author.table.sql'));
        await pg().none(sql('tables/blog.table.sql'));
        await pg().none(sql('tables/post.table.sql'));
        await pg().none(sql('tables/post-post-ref.table.sql'));

        await pg().none(sql('functions/country/create.sql'),[]);
        await pg().none(sql('functions/author/create.sql'));
        await pg().none(sql('functions/blog/create.sql'));
        await pg().none(sql('functions/post/create.sql'));

        await pg().none(sql('functions/country/read.sql'),[]);
        await pg().none(sql('functions/author/read.sql'));
        await pg().none(sql('functions/blog/read.sql'));
        await pg().none(sql('functions/post/read.sql'));

        await pg().none(sql('procedures/country/update.sql'),[]);
        await pg().none(sql('procedures/author/update.sql'));
        await pg().none(sql('procedures/blog/update.sql'));
        await pg().none(sql('procedures/post/update.sql'));

        await pg().none(sql('procedures/country/delete.sql'),[]);
        await pg().none(sql('procedures/author/delete.sql'));
        await pg().none(sql('procedures/blog/delete.sql'));
        await pg().none(sql('procedures/post/delete.sql'));

    } catch(error) {
        console.log(error);
    }


}
