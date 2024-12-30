export interface Ordenador {
  id: number;
  tercero_id: number;
  ordenador_argo_id: number;
  ordenador_sikarca_id: number;
  resolucion: string;
  documento_identidad: string;
  cargo_id: number;
  contrato_general_id: number;
  activo: boolean;
  fecha_creacion: string;
  fecha_modificacion: string;
}

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
