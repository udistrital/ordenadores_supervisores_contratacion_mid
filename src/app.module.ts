import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdenadorModule } from './ordenador/ordenador.module';
import { SupervisorModule } from './supervisor/supervisor.module';
import { RolOrdenadorModule } from './rol_ordenador/rol_ordenador.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,         
      envFilePath: '.env',    
    }),
    OrdenadorModule,          
    SupervisorModule, RolOrdenadorModule,       
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
