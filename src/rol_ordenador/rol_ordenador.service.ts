import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { StandardResponse } from 'src/interfaces/responses.interfaces';
import * as xml2js from 'xml2js';

@Injectable()
export class RolOrdenadorService {
  private readonly logger = new Logger(RolOrdenadorService.name);

  constructor(private configService: ConfigService) {}

  private async parseResponse(responseData: string): Promise<any> {
    try {
      return JSON.parse(responseData);
    } catch (error) {
      return this.parseXml(responseData);
    }
  }
  
  private async parseXml(xmlString: string): Promise<any> {
    const parser = new xml2js.Parser({
      explicitArray: false,
      trim: true,
      mergeAttrs: true,
      xmlns: true,
      explicitRoot: false
    });
  
    try {
      return await parser.parseStringPromise(xmlString);
    } catch (error) {
      throw error;
    }
  }  

  async getRolOrdenadores(): Promise<StandardResponse<any>> {
    try {
      const endpoint: string = this.configService.get<string>('ENDP_ROL_ORDENADOR');
      const url = `${endpoint}/rol_ordenador`;
  
      const response = await axios.get(url, {
        responseType: 'text',
        transformResponse: [data => {
          return data;
        }]
      });
  
      const parsedData = await this.parseResponse(response.data);
      
      if (parsedData.rol && parsedData.rol.ordenador) {
        const ordenadores = parsedData.rol.ordenador || [];
        const ordenadoresArray = Array.isArray(ordenadores) ? ordenadores : [ordenadores];
  
        if (ordenadoresArray.length === 0) {
          return { 
            Success: false, 
            Status: HttpStatus.NOT_FOUND, 
            Message: 'Roles de ordenadores no encontrados' 
          };
        }
  
        return { 
          Success: true, 
          Status: HttpStatus.OK, 
          Message: 'Roles de ordenadores recuperados exitosamente', 
          Data: ordenadoresArray 
        };
      }
  
      return { 
        Success: false, 
        Status: HttpStatus.INTERNAL_SERVER_ERROR, 
        Message: 'Formato de respuesta inesperado' 
      };
  
    } catch (error) { 
      return { 
        Success: false, 
        Status: error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR, 
        Message: error.message || 'Error al consultar los roles de ordenadores' 
      };
    }
  }

  async getOrdenadorActual(rol: number): Promise<StandardResponse<any>> {
    try {
      const endpoint: string = this.configService.get<string>('ENDP_ROL_ORDENADOR');
      
      // Formatear fecha como YYYY-MM-DD
      const fechaActual = new Date().toISOString().split('T')[0];
      const url = `${endpoint}/ordenador_fecha?fecha_fin=${fechaActual}&rol_id=${rol}`;
  
      const response = await axios.get(url, {
        responseType: 'text',
        transformResponse: [data => {
          return data;
        }]
      });
  
      const parsedData = await this.parseResponse(response.data);
      
      if (parsedData.ordenador && parsedData.ordenador.fechas) {
        const ordenadores = parsedData.ordenador.fechas || [];
        const ordenadoresArray = Array.isArray(ordenadores) ? ordenadores : [ordenadores];
  
        if (ordenadoresArray.length === 0) {
          return { 
            Success: false, 
            Status: HttpStatus.NOT_FOUND, 
            Message: 'Roles de ordenadores no encontrados' 
          };
        }
  
        return { 
          Success: true, 
          Status: HttpStatus.OK, 
          Message: 'Roles de ordenadores recuperados exitosamente', 
          Data: ordenadoresArray 
        };
      }
  
      return { 
        Success: false, 
        Status: HttpStatus.INTERNAL_SERVER_ERROR, 
        Message: 'Formato de respuesta inesperado' 
      };
  
    } catch (error) {  
      return { 
        Success: false, 
        Status: error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR, 
        Message: error.message || 'Error al consultar los roles de ordenadores' 
      };
    }
  }  
}