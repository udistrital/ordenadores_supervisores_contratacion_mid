# Ordenadores y supervisores contratación MID - ARGO MID

API MID intermediaria entre el cliente ARGOv2 y el API de <>.

## Especificaciones Técnicas

### Tecnologías Implementadas y Versiones
* NodeJS 20
* NestJS 10

### Variables de Entorno
```shell
ENDP_ROL_ORDENADOR
ENDP_SUPERVISOR_POR_DOCUMENTO
ENDP_SUPERVISOR_DEPENDENCIA
ENDP_TERCEROS_CRUD
```
**NOTA:** Las variables se asignan en una archivo privado .env.

### Ejecución del Proyecto
```shell
# 1. Instalación de Dependencias
npm install

# 2. Crear el archivo .env y asignar las variables de entorno
touch .env

# 3. Ejectuar el proyecto
npm start:dev (Modo Desarrollo)
```

Nota: En caso de no asignar el puerto en las variables de entorno, se asignará el puerto por defecto.
### Ejecución Dockerfile
```shell
# 
```

### Ejecución docker-compose
```shell
# 
```

### Ejecución Pruebas

Pruebas unitarias
```shell
# Test
npm test

# Se ejecutará jest, validando los casos de prueba en los archivos .spec.ts

npm test:cov
# Validar la cobertura de las pruebas
```

## Estado CI

EN PROCESO

## Licencia

This file is part of proveedores_mid.

proveedores_mid is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

proveedores_mid is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with sga_mid. If not, see https://www.gnu.org/licenses/.