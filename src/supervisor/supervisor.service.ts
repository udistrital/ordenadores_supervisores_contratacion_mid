import { Injectable, HttpService } from '@nestjs/common';

@Injectable()
export class SupervisorService {
  constructor(private readonly httpService: HttpService) {}

  async getSupervisores(queryParams: any) {
    const apiUrl = 'https://autenticacion.portaloas.udistrital.edu.co/store/apis/info?name=administrativa_amazon_api&version=v1&provider=admin&tenant=carbon.super/supervisor_contrato';

    try {
      const response = await this.httpService.get(apiUrl, {
        params: queryParams,
      }).toPromise();
      
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching supervisores: ${error.message}`);
    }
  }
}
