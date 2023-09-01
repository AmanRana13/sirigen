export interface IGetSecretsDataParams {
  keys: string;
}

export interface ISecretsResponse {
  pusherKey?: string;
  pusherCluster?: string;
  googleMapKey?: string;
}
