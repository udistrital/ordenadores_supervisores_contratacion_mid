export interface SupervidorDependenciaResponse {
  supervisor: Supervisor;
}

export interface Supervisor {
  dependencia: Dependencia[];
}

export interface Dependencia {
  dependencia_supervisor: string;
  estado: string;
  fecha_inicio: string;
  fecha_fin: string;
  cargo_id: string;
  documento: string;
  cargo: string;
  nombre: string;
  digito_verificacion: string;
  sede_supervisor: string;
}

export interface SupervisorDocumentoResponse {
  supervisor: {
    contrato: Contrato[];
  };
}

export interface Contrato {
  dependencia_supervisor: string;
  estado: boolean;
  fecha_inicio: string;
  fecha_fin: string;
  cargo_id: number;
  documento: string;
  cargo: string;
  nombre: string;
  digito_verificacion: string;
  sede_supervisor: string;
}
