import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('healthCheck', () => {
    it('debería devolver una respuesta exitosa del health check', () => {
      const expectedResult = {
        Status: 'ok',
        checkCount: 1,
      };
      jest.spyOn(appService, 'healthCheck').mockReturnValue(expectedResult);

      const result = appController.healthCheck();

      expect(appService.healthCheck).toHaveBeenCalled();
      expect(result).toBe(expectedResult);
    });

    it('debería devolver una respuesta de error cuando el health check falla', () => {
      const expectedError = {
        Status: 'error',
        error: 'Servicio no disponible',
      };
      jest.spyOn(appService, 'healthCheck').mockReturnValue(expectedError);

      const result = appController.healthCheck();

      expect(appService.healthCheck).toHaveBeenCalled();
      expect(result).toBe(expectedError);
    });
  });
});
