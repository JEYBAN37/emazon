import { SaleInterface } from "./sale-interface";

export interface StatisticsJson {
    sales :SaleInterface[],
    totalSales : number,
    totalArticles : number,
}