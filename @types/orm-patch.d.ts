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
    ACL?: FibACLDef
    OACL?: FibOACLDef
    functions?: {
        [funcName: string]: FibAppWebApiFunctionInModel
    },
    no_graphql?: boolean
}
interface FibAppORMModel extends FibOrmNS.FibOrmFixedModel {
    // globally unique class id
    cid: number
    model_name: string;
    ACL: FibACLDef// ACLDefinition
    OACL: FibOACLDef// OACLDefinition
    functions: FibAppORMModelFunctions
    no_graphql: boolean

    extends: { [extendModel: string]: FibAppFixedOrmExtendModelWrapper };
}

interface FibAppFixedOrmExtendModelWrapper extends FibOrmNS.ExtendModelWrapper {
    extraProperties: {
        [modelName: string]: FibAppORMModel
    }
}
