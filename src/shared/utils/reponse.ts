export const successReponse: Required<ResponseOK> = {
  success: true,
};

export interface ResponseOK {
  readonly success: Required<boolean>;
}

export interface ParameterDecorator {
  readonly context: {
    readonly config: {
      readonly url: string;
    };
  };
  readonly hostname: string;
  readonly protocol: string;
}

export const getRoute = (params: Readonly<ParameterDecorator>): string => {
  const url = params?.context?.config?.url || '/api/example';
  const hostname = params?.hostname || '127.0.0.1:3000';
  const protocol = (params?.protocol || 'http') + '://';
  return protocol + hostname + url;
};
