#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkIamStack } from '../lib/cdk_iam-stack';

const app = new cdk.App();
new CdkIamStack(app, 'CdkIamStack');
