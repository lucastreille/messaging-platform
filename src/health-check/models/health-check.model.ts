import { Field, ObjectType } from '@nestjs/graphql';


@ObjectType()
export class HealthCheckResult {

  @Field()
  result: string;

}