/// <reference path="acl.d.ts" />
/// <reference path="req.d.ts" />

import FibOrmNS, { FibORM } from 'orm';
import { FibAppReq, FibAppWebApiFunctionInModel } from './app';

interface FibAppOrmInstance extends FibOrmNS.FibOrmFixedModelInstance {
    acl: ACLDefinition
    oacl: OACLDefinition
}

type ORMFindResult = FibOrmNS.FibOrmFixedModelInstance

interface FibAppORMModelFunctions {
    [fnName: string]: (req: FibAppReq, data: any) => FibAppResponse
}

// keep compatible with definition in 'orm'
interface AppSpecialDateProperty extends FibOrmNS.OrigDetailedModelProperty {
    type: 'date'
    time?: true
}
interface OrigORMDefProperties {
    createdAt?: AppSpecialDateProperty
    updatedAt?: AppSpecialDateProperty
    [key: string]: FibOrmNS.OrigModelPropertyDefinition
}

interface FibAppOrmModelDefOptions extends FibOrmNS.FibOrmFixedModelOptions {
    ACL?: ACLGeneratorFn
    OACL?: OACLGeneratorFn
    functions?: {
        [funcName: string]: FibAppWebApiFunctionInModel
    }
}
interface FibAppORMModel extends FibOrmNS.FibOrmFixedModel {
    // globally unique class id
    cid: number
    model_name: string;
    functions: FibAppORMModelFunctions
    ACL: FibACLDef// ACLDefinition
    OACL: FibOACLDef// OACLDefinition
}