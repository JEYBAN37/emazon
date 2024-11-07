export class ArticleJson {
    public name!:string;
    public description!:string;
    public quantity !: number;
    public price !: number;
    public brand !: BrandJson;
    public articleCategories !: CategoryJson[];
}

export class BrandJson {
    public id !: number;
    public name !: string;
}

export class CategoryJson {
    public id !: number;
    public name !: string;
}