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

        await pg().none(sql('procedures/country/create.sql'),[]);
        await pg().none(sql('procedures/author/create.sql'));
        await pg().none(sql('procedures/blog/create.sql'));
        await pg().none(sql('procedures/post/create.sql'));




    } catch(error) {
        console.log(error);
    }


}
