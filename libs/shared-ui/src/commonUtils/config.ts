export const EnvironmentValues = ['local', 'dev', 'stage', 'prod'] as const;
export type Environment = typeof EnvironmentValues[number];

export const isEnvironmentValue = (value: string): value is Environment => {
  return EnvironmentValues.includes(value as Environment);
};

export type ConfigType = {
  [env in Environment]: {
    resourceContentBucket: string;
    processedMediaBucket: string;
  };
};

export const config: ConfigType = {
  local: {
    resourceContentBucket: 'geneo-content-resource-files',
    processedMediaBucket: 'geneo-content-processed-media',
  },
  dev: {
    resourceContentBucket: 'geneo-content-resource-files',
    processedMediaBucket: 'geneo-content-processed-media',
  },
  stage: {
    resourceContentBucket: 'geneo-content-resource-files',
    processedMediaBucket: 'geneo-content-processed-media',
  },
  prod: {
    resourceContentBucket: 'geneo-content-resource-files',
    processedMediaBucket: 'geneo-content-processed-media',
  },
};
//geneo-staging-content
export const getEnvConfig = () => {
  const nxGeneoEnv = process.env.NX_GENEO_ENV || 'local';
  const environment = (
    isEnvironmentValue(nxGeneoEnv) ? nxGeneoEnv : 'local'
  ) as Environment;
  return config[environment];
};
