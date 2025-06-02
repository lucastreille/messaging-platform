import { Query, Resolver } from '@nestjs/graphql';

import { HealthCheckResult } from './models/health-check.model';


@Resolver()
export class HealthCheckResolver {
  
  @Query(() => HealthCheckResult)
  healthCheck(): HealthCheckResult {
    return { result: 'ok' };
  }

}
