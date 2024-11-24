import { Component, OnInit } from '@angular/core';
import { STATISTICS_CONSTANS } from 'src/app/shared/constants/constant';
import { Sale } from 'src/app/shared/models/sale-interface';
import { StatisticsJson } from 'src/app/shared/models/statistics-json';
import { StatisticsService } from 'src/app/shared/services/sale/statistics.service';

@Component({
  selector: 'app-card-statistics',
  templateUrl: './card-statistics.component.html',
  styleUrls: ['./card-statistics.component.scss']
})
export class CardStatisticsComponent implements OnInit {
  public title: string = STATISTICS_CONSTANS.TITLE;
  public subtitle: string = STATISTICS_CONSTANS.SUBTITLE;

  statisticsJson!: StatisticsJson;
  quantity: number = 0;
  price: number = 0;

  salesData:Sale[] = []; // Inicializado vacío

  colorsBar = ['#9D3FE7', '#FF5733', '#33C3FF', '#FFC107', '#28A745'];

  constructor(private statisticsService: StatisticsService) {}

  loadData() {
    this.statisticsService.getStatisticsData().subscribe(data => {
      // Asignar datos correctamente
      this.statisticsJson = {
        sales: data.sales,
        totalArticles: data.totalArticles,
        totalSales: data.totalSales,
      };

      this.quantity = this.statisticsJson.totalArticles;
      this.price = this.statisticsJson.totalSales;

      // Crear las barras dinámicamente
      this.salesData = this.statisticsJson.sales.map((sale, index) => ({
        id: sale.idArticle,
        percentage: Math.floor((sale.quantity / this.quantity) * 100),
        color: this.colorsBar[index % this.colorsBar.length], // Asignar color dinámico
      }));

      console.log(this.salesData); // Comprobar que salesData se generó correctamente
    });
  }

  ngOnInit(): void {
    this.loadData();
  }
}
