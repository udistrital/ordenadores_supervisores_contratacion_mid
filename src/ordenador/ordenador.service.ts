import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { OrdenadorQueryDto } from './dto/ordenador-dto';

@Injectable()
export class OrdenadorService {
  constructor(private readonly httpService: HttpService) {}

  async getOrdenadores(queryParams: OrdenadorQueryDto) {
    const apiUrl = 'https://autenticacion.portaloas.udistrital.edu.co/store/apis/info?name=administrativa_amazon_api&version=v1&provider=admin&tenant=carbon.super/ordenador_gasto';

    try {
      const response = await this.httpService.get(apiUrl, {
        params: queryParams,
      }).toPromise();
      
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching ordenadores: ${error.message}`);
    }
  }
}
