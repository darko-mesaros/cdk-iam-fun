import * as cdk from '@aws-cdk/core';
import {PolicyStatementFactory, Action } from 'iam-policy-generator';
import * as lambda from '@aws-cdk/aws-lambda';
import * as s3 from '@aws-cdk/aws-s3';
import {Effect} from '@aws-cdk/aws-iam';

export class CdkIamStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // --- bucket ---
    const myBucket = new s3.Bucket(this, 'myLovelyBucket');
    
    // --- lambda ---
    const myLambda = new lambda.Function(this, 'myAwesomeFunction', {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda')
    });

    myLambda.addToRolePolicy(
      new PolicyStatementFactory()
        .setEffect(Effect.ALLOW)
        .addResource(myBucket.bucketArn)
        .addActions([Action.S3.LIST_BUCKET, Action.S3.PUT_OBJECT])
        .build()
    );
    
  }
}
