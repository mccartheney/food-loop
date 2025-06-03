
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Notification
 * 
 */
export type Notification = $Result.DefaultSelection<Prisma.$NotificationPayload>
/**
 * Model Conversation
 * 
 */
export type Conversation = $Result.DefaultSelection<Prisma.$ConversationPayload>
/**
 * Model Message
 * 
 */
export type Message = $Result.DefaultSelection<Prisma.$MessagePayload>
/**
 * Model MessageStatusRecord
 * 
 */
export type MessageStatusRecord = $Result.DefaultSelection<Prisma.$MessageStatusRecordPayload>
/**
 * Model MessageReaction
 * 
 */
export type MessageReaction = $Result.DefaultSelection<Prisma.$MessageReactionPayload>
/**
 * Model UserPresence
 * 
 */
export type UserPresence = $Result.DefaultSelection<Prisma.$UserPresencePayload>
/**
 * Model NotificationSettings
 * 
 */
export type NotificationSettings = $Result.DefaultSelection<Prisma.$NotificationSettingsPayload>
/**
 * Model TypingIndicator
 * 
 */
export type TypingIndicator = $Result.DefaultSelection<Prisma.$TypingIndicatorPayload>
/**
 * Model MessageThread
 * 
 */
export type MessageThread = $Result.DefaultSelection<Prisma.$MessageThreadPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const NotificationType: {
  FRIEND_REQUEST: 'FRIEND_REQUEST',
  FRIEND_ACCEPTED: 'FRIEND_ACCEPTED',
  MESSAGE_RECEIVED: 'MESSAGE_RECEIVED',
  ORDER_STATUS_UPDATE: 'ORDER_STATUS_UPDATE',
  PANTRY_EXPIRY_WARNING: 'PANTRY_EXPIRY_WARNING',
  RECIPE_SHARED: 'RECIPE_SHARED',
  BOX_AVAILABLE: 'BOX_AVAILABLE',
  SYSTEM_ANNOUNCEMENT: 'SYSTEM_ANNOUNCEMENT'
};

export type NotificationType = (typeof NotificationType)[keyof typeof NotificationType]


export const MessageType: {
  TEXT: 'TEXT',
  IMAGE: 'IMAGE',
  FILE: 'FILE',
  RECIPE_SHARE: 'RECIPE_SHARE',
  BOX_SHARE: 'BOX_SHARE',
  LOCATION: 'LOCATION'
};

export type MessageType = (typeof MessageType)[keyof typeof MessageType]


export const MessageStatusType: {
  SENT: 'SENT',
  DELIVERED: 'DELIVERED',
  READ: 'READ'
};

export type MessageStatusType = (typeof MessageStatusType)[keyof typeof MessageStatusType]


export const ConversationType: {
  DIRECT: 'DIRECT',
  GROUP: 'GROUP'
};

export type ConversationType = (typeof ConversationType)[keyof typeof ConversationType]

}

export type NotificationType = $Enums.NotificationType

export const NotificationType: typeof $Enums.NotificationType

export type MessageType = $Enums.MessageType

export const MessageType: typeof $Enums.MessageType

export type MessageStatusType = $Enums.MessageStatusType

export const MessageStatusType: typeof $Enums.MessageStatusType

export type ConversationType = $Enums.ConversationType

export const ConversationType: typeof $Enums.ConversationType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Notifications
 * const notifications = await prisma.notification.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Notifications
   * const notifications = await prisma.notification.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P]): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number }): $Utils.JsPromise<R>

  /**
   * Executes a raw MongoDB command and returns the result of it.
   * @example
   * ```
   * const user = await prisma.$runCommandRaw({
   *   aggregate: 'User',
   *   pipeline: [{ $match: { name: 'Bob' } }, { $project: { email: true, _id: false } }],
   *   explain: false,
   * })
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $runCommandRaw(command: Prisma.InputJsonObject): Prisma.PrismaPromise<Prisma.JsonObject>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.notification`: Exposes CRUD operations for the **Notification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Notifications
    * const notifications = await prisma.notification.findMany()
    * ```
    */
  get notification(): Prisma.NotificationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.conversation`: Exposes CRUD operations for the **Conversation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Conversations
    * const conversations = await prisma.conversation.findMany()
    * ```
    */
  get conversation(): Prisma.ConversationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.message`: Exposes CRUD operations for the **Message** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Messages
    * const messages = await prisma.message.findMany()
    * ```
    */
  get message(): Prisma.MessageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.messageStatusRecord`: Exposes CRUD operations for the **MessageStatusRecord** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MessageStatusRecords
    * const messageStatusRecords = await prisma.messageStatusRecord.findMany()
    * ```
    */
  get messageStatusRecord(): Prisma.MessageStatusRecordDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.messageReaction`: Exposes CRUD operations for the **MessageReaction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MessageReactions
    * const messageReactions = await prisma.messageReaction.findMany()
    * ```
    */
  get messageReaction(): Prisma.MessageReactionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userPresence`: Exposes CRUD operations for the **UserPresence** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserPresences
    * const userPresences = await prisma.userPresence.findMany()
    * ```
    */
  get userPresence(): Prisma.UserPresenceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.notificationSettings`: Exposes CRUD operations for the **NotificationSettings** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more NotificationSettings
    * const notificationSettings = await prisma.notificationSettings.findMany()
    * ```
    */
  get notificationSettings(): Prisma.NotificationSettingsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.typingIndicator`: Exposes CRUD operations for the **TypingIndicator** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TypingIndicators
    * const typingIndicators = await prisma.typingIndicator.findMany()
    * ```
    */
  get typingIndicator(): Prisma.TypingIndicatorDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.messageThread`: Exposes CRUD operations for the **MessageThread** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MessageThreads
    * const messageThreads = await prisma.messageThread.findMany()
    * ```
    */
  get messageThread(): Prisma.MessageThreadDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.8.2
   * Query Engine version: 2060c79ba17c6bb9f5823312b6f6b7f4a845738e
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Notification: 'Notification',
    Conversation: 'Conversation',
    Message: 'Message',
    MessageStatusRecord: 'MessageStatusRecord',
    MessageReaction: 'MessageReaction',
    UserPresence: 'UserPresence',
    NotificationSettings: 'NotificationSettings',
    TypingIndicator: 'TypingIndicator',
    MessageThread: 'MessageThread'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "notification" | "conversation" | "message" | "messageStatusRecord" | "messageReaction" | "userPresence" | "notificationSettings" | "typingIndicator" | "messageThread"
      txIsolationLevel: never
    }
    model: {
      Notification: {
        payload: Prisma.$NotificationPayload<ExtArgs>
        fields: Prisma.NotificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NotificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NotificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findFirst: {
            args: Prisma.NotificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NotificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findMany: {
            args: Prisma.NotificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          create: {
            args: Prisma.NotificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          createMany: {
            args: Prisma.NotificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.NotificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          update: {
            args: Prisma.NotificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          deleteMany: {
            args: Prisma.NotificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NotificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.NotificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          aggregate: {
            args: Prisma.NotificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotification>
          }
          groupBy: {
            args: Prisma.NotificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotificationGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.NotificationFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.NotificationAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.NotificationCountArgs<ExtArgs>
            result: $Utils.Optional<NotificationCountAggregateOutputType> | number
          }
        }
      }
      Conversation: {
        payload: Prisma.$ConversationPayload<ExtArgs>
        fields: Prisma.ConversationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ConversationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ConversationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          findFirst: {
            args: Prisma.ConversationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ConversationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          findMany: {
            args: Prisma.ConversationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>[]
          }
          create: {
            args: Prisma.ConversationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          createMany: {
            args: Prisma.ConversationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ConversationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          update: {
            args: Prisma.ConversationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          deleteMany: {
            args: Prisma.ConversationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ConversationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ConversationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          aggregate: {
            args: Prisma.ConversationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateConversation>
          }
          groupBy: {
            args: Prisma.ConversationGroupByArgs<ExtArgs>
            result: $Utils.Optional<ConversationGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.ConversationFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.ConversationAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.ConversationCountArgs<ExtArgs>
            result: $Utils.Optional<ConversationCountAggregateOutputType> | number
          }
        }
      }
      Message: {
        payload: Prisma.$MessagePayload<ExtArgs>
        fields: Prisma.MessageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MessageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MessageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          findFirst: {
            args: Prisma.MessageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MessageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          findMany: {
            args: Prisma.MessageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          create: {
            args: Prisma.MessageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          createMany: {
            args: Prisma.MessageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.MessageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          update: {
            args: Prisma.MessageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          deleteMany: {
            args: Prisma.MessageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MessageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MessageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          aggregate: {
            args: Prisma.MessageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMessage>
          }
          groupBy: {
            args: Prisma.MessageGroupByArgs<ExtArgs>
            result: $Utils.Optional<MessageGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.MessageFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.MessageAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.MessageCountArgs<ExtArgs>
            result: $Utils.Optional<MessageCountAggregateOutputType> | number
          }
        }
      }
      MessageStatusRecord: {
        payload: Prisma.$MessageStatusRecordPayload<ExtArgs>
        fields: Prisma.MessageStatusRecordFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MessageStatusRecordFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageStatusRecordPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MessageStatusRecordFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageStatusRecordPayload>
          }
          findFirst: {
            args: Prisma.MessageStatusRecordFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageStatusRecordPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MessageStatusRecordFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageStatusRecordPayload>
          }
          findMany: {
            args: Prisma.MessageStatusRecordFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageStatusRecordPayload>[]
          }
          create: {
            args: Prisma.MessageStatusRecordCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageStatusRecordPayload>
          }
          createMany: {
            args: Prisma.MessageStatusRecordCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.MessageStatusRecordDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageStatusRecordPayload>
          }
          update: {
            args: Prisma.MessageStatusRecordUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageStatusRecordPayload>
          }
          deleteMany: {
            args: Prisma.MessageStatusRecordDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MessageStatusRecordUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MessageStatusRecordUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageStatusRecordPayload>
          }
          aggregate: {
            args: Prisma.MessageStatusRecordAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMessageStatusRecord>
          }
          groupBy: {
            args: Prisma.MessageStatusRecordGroupByArgs<ExtArgs>
            result: $Utils.Optional<MessageStatusRecordGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.MessageStatusRecordFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.MessageStatusRecordAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.MessageStatusRecordCountArgs<ExtArgs>
            result: $Utils.Optional<MessageStatusRecordCountAggregateOutputType> | number
          }
        }
      }
      MessageReaction: {
        payload: Prisma.$MessageReactionPayload<ExtArgs>
        fields: Prisma.MessageReactionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MessageReactionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageReactionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MessageReactionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageReactionPayload>
          }
          findFirst: {
            args: Prisma.MessageReactionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageReactionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MessageReactionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageReactionPayload>
          }
          findMany: {
            args: Prisma.MessageReactionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageReactionPayload>[]
          }
          create: {
            args: Prisma.MessageReactionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageReactionPayload>
          }
          createMany: {
            args: Prisma.MessageReactionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.MessageReactionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageReactionPayload>
          }
          update: {
            args: Prisma.MessageReactionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageReactionPayload>
          }
          deleteMany: {
            args: Prisma.MessageReactionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MessageReactionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MessageReactionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageReactionPayload>
          }
          aggregate: {
            args: Prisma.MessageReactionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMessageReaction>
          }
          groupBy: {
            args: Prisma.MessageReactionGroupByArgs<ExtArgs>
            result: $Utils.Optional<MessageReactionGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.MessageReactionFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.MessageReactionAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.MessageReactionCountArgs<ExtArgs>
            result: $Utils.Optional<MessageReactionCountAggregateOutputType> | number
          }
        }
      }
      UserPresence: {
        payload: Prisma.$UserPresencePayload<ExtArgs>
        fields: Prisma.UserPresenceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserPresenceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPresencePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserPresenceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPresencePayload>
          }
          findFirst: {
            args: Prisma.UserPresenceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPresencePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserPresenceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPresencePayload>
          }
          findMany: {
            args: Prisma.UserPresenceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPresencePayload>[]
          }
          create: {
            args: Prisma.UserPresenceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPresencePayload>
          }
          createMany: {
            args: Prisma.UserPresenceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UserPresenceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPresencePayload>
          }
          update: {
            args: Prisma.UserPresenceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPresencePayload>
          }
          deleteMany: {
            args: Prisma.UserPresenceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserPresenceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserPresenceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPresencePayload>
          }
          aggregate: {
            args: Prisma.UserPresenceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserPresence>
          }
          groupBy: {
            args: Prisma.UserPresenceGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserPresenceGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.UserPresenceFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.UserPresenceAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.UserPresenceCountArgs<ExtArgs>
            result: $Utils.Optional<UserPresenceCountAggregateOutputType> | number
          }
        }
      }
      NotificationSettings: {
        payload: Prisma.$NotificationSettingsPayload<ExtArgs>
        fields: Prisma.NotificationSettingsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NotificationSettingsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationSettingsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NotificationSettingsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationSettingsPayload>
          }
          findFirst: {
            args: Prisma.NotificationSettingsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationSettingsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NotificationSettingsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationSettingsPayload>
          }
          findMany: {
            args: Prisma.NotificationSettingsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationSettingsPayload>[]
          }
          create: {
            args: Prisma.NotificationSettingsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationSettingsPayload>
          }
          createMany: {
            args: Prisma.NotificationSettingsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.NotificationSettingsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationSettingsPayload>
          }
          update: {
            args: Prisma.NotificationSettingsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationSettingsPayload>
          }
          deleteMany: {
            args: Prisma.NotificationSettingsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NotificationSettingsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.NotificationSettingsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationSettingsPayload>
          }
          aggregate: {
            args: Prisma.NotificationSettingsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotificationSettings>
          }
          groupBy: {
            args: Prisma.NotificationSettingsGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotificationSettingsGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.NotificationSettingsFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.NotificationSettingsAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.NotificationSettingsCountArgs<ExtArgs>
            result: $Utils.Optional<NotificationSettingsCountAggregateOutputType> | number
          }
        }
      }
      TypingIndicator: {
        payload: Prisma.$TypingIndicatorPayload<ExtArgs>
        fields: Prisma.TypingIndicatorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TypingIndicatorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TypingIndicatorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TypingIndicatorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TypingIndicatorPayload>
          }
          findFirst: {
            args: Prisma.TypingIndicatorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TypingIndicatorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TypingIndicatorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TypingIndicatorPayload>
          }
          findMany: {
            args: Prisma.TypingIndicatorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TypingIndicatorPayload>[]
          }
          create: {
            args: Prisma.TypingIndicatorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TypingIndicatorPayload>
          }
          createMany: {
            args: Prisma.TypingIndicatorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.TypingIndicatorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TypingIndicatorPayload>
          }
          update: {
            args: Prisma.TypingIndicatorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TypingIndicatorPayload>
          }
          deleteMany: {
            args: Prisma.TypingIndicatorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TypingIndicatorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TypingIndicatorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TypingIndicatorPayload>
          }
          aggregate: {
            args: Prisma.TypingIndicatorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTypingIndicator>
          }
          groupBy: {
            args: Prisma.TypingIndicatorGroupByArgs<ExtArgs>
            result: $Utils.Optional<TypingIndicatorGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.TypingIndicatorFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.TypingIndicatorAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.TypingIndicatorCountArgs<ExtArgs>
            result: $Utils.Optional<TypingIndicatorCountAggregateOutputType> | number
          }
        }
      }
      MessageThread: {
        payload: Prisma.$MessageThreadPayload<ExtArgs>
        fields: Prisma.MessageThreadFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MessageThreadFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageThreadPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MessageThreadFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageThreadPayload>
          }
          findFirst: {
            args: Prisma.MessageThreadFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageThreadPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MessageThreadFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageThreadPayload>
          }
          findMany: {
            args: Prisma.MessageThreadFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageThreadPayload>[]
          }
          create: {
            args: Prisma.MessageThreadCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageThreadPayload>
          }
          createMany: {
            args: Prisma.MessageThreadCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.MessageThreadDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageThreadPayload>
          }
          update: {
            args: Prisma.MessageThreadUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageThreadPayload>
          }
          deleteMany: {
            args: Prisma.MessageThreadDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MessageThreadUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MessageThreadUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageThreadPayload>
          }
          aggregate: {
            args: Prisma.MessageThreadAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMessageThread>
          }
          groupBy: {
            args: Prisma.MessageThreadGroupByArgs<ExtArgs>
            result: $Utils.Optional<MessageThreadGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.MessageThreadFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.MessageThreadAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.MessageThreadCountArgs<ExtArgs>
            result: $Utils.Optional<MessageThreadCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $runCommandRaw: {
          args: Prisma.InputJsonObject,
          result: Prisma.JsonObject
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    notification?: NotificationOmit
    conversation?: ConversationOmit
    message?: MessageOmit
    messageStatusRecord?: MessageStatusRecordOmit
    messageReaction?: MessageReactionOmit
    userPresence?: UserPresenceOmit
    notificationSettings?: NotificationSettingsOmit
    typingIndicator?: TypingIndicatorOmit
    messageThread?: MessageThreadOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ConversationCountOutputType
   */

  export type ConversationCountOutputType = {
    messages: number
  }

  export type ConversationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    messages?: boolean | ConversationCountOutputTypeCountMessagesArgs
  }

  // Custom InputTypes
  /**
   * ConversationCountOutputType without action
   */
  export type ConversationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConversationCountOutputType
     */
    select?: ConversationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ConversationCountOutputType without action
   */
  export type ConversationCountOutputTypeCountMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
  }


  /**
   * Count Type MessageCountOutputType
   */

  export type MessageCountOutputType = {
    replies: number
    reactions: number
    status: number
  }

  export type MessageCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    replies?: boolean | MessageCountOutputTypeCountRepliesArgs
    reactions?: boolean | MessageCountOutputTypeCountReactionsArgs
    status?: boolean | MessageCountOutputTypeCountStatusArgs
  }

  // Custom InputTypes
  /**
   * MessageCountOutputType without action
   */
  export type MessageCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageCountOutputType
     */
    select?: MessageCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MessageCountOutputType without action
   */
  export type MessageCountOutputTypeCountRepliesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
  }

  /**
   * MessageCountOutputType without action
   */
  export type MessageCountOutputTypeCountReactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageReactionWhereInput
  }

  /**
   * MessageCountOutputType without action
   */
  export type MessageCountOutputTypeCountStatusArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageStatusRecordWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Notification
   */

  export type AggregateNotification = {
    _count: NotificationCountAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  export type NotificationMinAggregateOutputType = {
    id: string | null
    userId: string | null
    type: $Enums.NotificationType | null
    title: string | null
    message: string | null
    isRead: boolean | null
    actionUrl: string | null
    createdAt: Date | null
    expiresAt: Date | null
  }

  export type NotificationMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    type: $Enums.NotificationType | null
    title: string | null
    message: string | null
    isRead: boolean | null
    actionUrl: string | null
    createdAt: Date | null
    expiresAt: Date | null
  }

  export type NotificationCountAggregateOutputType = {
    id: number
    userId: number
    type: number
    title: number
    message: number
    data: number
    isRead: number
    actionUrl: number
    createdAt: number
    expiresAt: number
    _all: number
  }


  export type NotificationMinAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    title?: true
    message?: true
    isRead?: true
    actionUrl?: true
    createdAt?: true
    expiresAt?: true
  }

  export type NotificationMaxAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    title?: true
    message?: true
    isRead?: true
    actionUrl?: true
    createdAt?: true
    expiresAt?: true
  }

  export type NotificationCountAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    title?: true
    message?: true
    data?: true
    isRead?: true
    actionUrl?: true
    createdAt?: true
    expiresAt?: true
    _all?: true
  }

  export type NotificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notification to aggregate.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Notifications
    **/
    _count?: true | NotificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificationMaxAggregateInputType
  }

  export type GetNotificationAggregateType<T extends NotificationAggregateArgs> = {
        [P in keyof T & keyof AggregateNotification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotification[P]>
      : GetScalarType<T[P], AggregateNotification[P]>
  }




  export type NotificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithAggregationInput | NotificationOrderByWithAggregationInput[]
    by: NotificationScalarFieldEnum[] | NotificationScalarFieldEnum
    having?: NotificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificationCountAggregateInputType | true
    _min?: NotificationMinAggregateInputType
    _max?: NotificationMaxAggregateInputType
  }

  export type NotificationGroupByOutputType = {
    id: string
    userId: string
    type: $Enums.NotificationType
    title: string
    message: string
    data: JsonValue | null
    isRead: boolean
    actionUrl: string | null
    createdAt: Date
    expiresAt: Date | null
    _count: NotificationCountAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  type GetNotificationGroupByPayload<T extends NotificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotificationGroupByOutputType[P]>
            : GetScalarType<T[P], NotificationGroupByOutputType[P]>
        }
      >
    >


  export type NotificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    title?: boolean
    message?: boolean
    data?: boolean
    isRead?: boolean
    actionUrl?: boolean
    createdAt?: boolean
    expiresAt?: boolean
  }, ExtArgs["result"]["notification"]>



  export type NotificationSelectScalar = {
    id?: boolean
    userId?: boolean
    type?: boolean
    title?: boolean
    message?: boolean
    data?: boolean
    isRead?: boolean
    actionUrl?: boolean
    createdAt?: boolean
    expiresAt?: boolean
  }

  export type NotificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "type" | "title" | "message" | "data" | "isRead" | "actionUrl" | "createdAt" | "expiresAt", ExtArgs["result"]["notification"]>

  export type $NotificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Notification"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      type: $Enums.NotificationType
      title: string
      message: string
      data: Prisma.JsonValue | null
      isRead: boolean
      actionUrl: string | null
      createdAt: Date
      expiresAt: Date | null
    }, ExtArgs["result"]["notification"]>
    composites: {}
  }

  type NotificationGetPayload<S extends boolean | null | undefined | NotificationDefaultArgs> = $Result.GetResult<Prisma.$NotificationPayload, S>

  type NotificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NotificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NotificationCountAggregateInputType | true
    }

  export interface NotificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Notification'], meta: { name: 'Notification' } }
    /**
     * Find zero or one Notification that matches the filter.
     * @param {NotificationFindUniqueArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NotificationFindUniqueArgs>(args: SelectSubset<T, NotificationFindUniqueArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Notification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NotificationFindUniqueOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NotificationFindUniqueOrThrowArgs>(args: SelectSubset<T, NotificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NotificationFindFirstArgs>(args?: SelectSubset<T, NotificationFindFirstArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NotificationFindFirstOrThrowArgs>(args?: SelectSubset<T, NotificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Notifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notifications
     * const notifications = await prisma.notification.findMany()
     * 
     * // Get first 10 Notifications
     * const notifications = await prisma.notification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const notificationWithIdOnly = await prisma.notification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NotificationFindManyArgs>(args?: SelectSubset<T, NotificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Notification.
     * @param {NotificationCreateArgs} args - Arguments to create a Notification.
     * @example
     * // Create one Notification
     * const Notification = await prisma.notification.create({
     *   data: {
     *     // ... data to create a Notification
     *   }
     * })
     * 
     */
    create<T extends NotificationCreateArgs>(args: SelectSubset<T, NotificationCreateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Notifications.
     * @param {NotificationCreateManyArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NotificationCreateManyArgs>(args?: SelectSubset<T, NotificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Notification.
     * @param {NotificationDeleteArgs} args - Arguments to delete one Notification.
     * @example
     * // Delete one Notification
     * const Notification = await prisma.notification.delete({
     *   where: {
     *     // ... filter to delete one Notification
     *   }
     * })
     * 
     */
    delete<T extends NotificationDeleteArgs>(args: SelectSubset<T, NotificationDeleteArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Notification.
     * @param {NotificationUpdateArgs} args - Arguments to update one Notification.
     * @example
     * // Update one Notification
     * const notification = await prisma.notification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NotificationUpdateArgs>(args: SelectSubset<T, NotificationUpdateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Notifications.
     * @param {NotificationDeleteManyArgs} args - Arguments to filter Notifications to delete.
     * @example
     * // Delete a few Notifications
     * const { count } = await prisma.notification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NotificationDeleteManyArgs>(args?: SelectSubset<T, NotificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NotificationUpdateManyArgs>(args: SelectSubset<T, NotificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Notification.
     * @param {NotificationUpsertArgs} args - Arguments to update or create a Notification.
     * @example
     * // Update or create a Notification
     * const notification = await prisma.notification.upsert({
     *   create: {
     *     // ... data to create a Notification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Notification we want to update
     *   }
     * })
     */
    upsert<T extends NotificationUpsertArgs>(args: SelectSubset<T, NotificationUpsertArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Notifications that matches the filter.
     * @param {NotificationFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const notification = await prisma.notification.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: NotificationFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Notification.
     * @param {NotificationAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const notification = await prisma.notification.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: NotificationAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationCountArgs} args - Arguments to filter Notifications to count.
     * @example
     * // Count the number of Notifications
     * const count = await prisma.notification.count({
     *   where: {
     *     // ... the filter for the Notifications we want to count
     *   }
     * })
    **/
    count<T extends NotificationCountArgs>(
      args?: Subset<T, NotificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NotificationAggregateArgs>(args: Subset<T, NotificationAggregateArgs>): Prisma.PrismaPromise<GetNotificationAggregateType<T>>

    /**
     * Group by Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NotificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NotificationGroupByArgs['orderBy'] }
        : { orderBy?: NotificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NotificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Notification model
   */
  readonly fields: NotificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Notification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NotificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Notification model
   */
  interface NotificationFieldRefs {
    readonly id: FieldRef<"Notification", 'String'>
    readonly userId: FieldRef<"Notification", 'String'>
    readonly type: FieldRef<"Notification", 'NotificationType'>
    readonly title: FieldRef<"Notification", 'String'>
    readonly message: FieldRef<"Notification", 'String'>
    readonly data: FieldRef<"Notification", 'Json'>
    readonly isRead: FieldRef<"Notification", 'Boolean'>
    readonly actionUrl: FieldRef<"Notification", 'String'>
    readonly createdAt: FieldRef<"Notification", 'DateTime'>
    readonly expiresAt: FieldRef<"Notification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Notification findUnique
   */
  export type NotificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findUniqueOrThrow
   */
  export type NotificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findFirst
   */
  export type NotificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findFirstOrThrow
   */
  export type NotificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findMany
   */
  export type NotificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Filter, which Notifications to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification create
   */
  export type NotificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The data needed to create a Notification.
     */
    data: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
  }

  /**
   * Notification createMany
   */
  export type NotificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
  }

  /**
   * Notification update
   */
  export type NotificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The data needed to update a Notification.
     */
    data: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
    /**
     * Choose, which Notification to update.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification updateMany
   */
  export type NotificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to update.
     */
    limit?: number
  }

  /**
   * Notification upsert
   */
  export type NotificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The filter to search for the Notification to update in case it exists.
     */
    where: NotificationWhereUniqueInput
    /**
     * In case the Notification found by the `where` argument doesn't exist, create a new Notification with this data.
     */
    create: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
    /**
     * In case the Notification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
  }

  /**
   * Notification delete
   */
  export type NotificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Filter which Notification to delete.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification deleteMany
   */
  export type NotificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notifications to delete
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to delete.
     */
    limit?: number
  }

  /**
   * Notification findRaw
   */
  export type NotificationFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Notification aggregateRaw
   */
  export type NotificationAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Notification without action
   */
  export type NotificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
  }


  /**
   * Model Conversation
   */

  export type AggregateConversation = {
    _count: ConversationCountAggregateOutputType | null
    _min: ConversationMinAggregateOutputType | null
    _max: ConversationMaxAggregateOutputType | null
  }

  export type ConversationMinAggregateOutputType = {
    id: string | null
    type: $Enums.ConversationType | null
    name: string | null
    image: string | null
    createdBy: string | null
    lastActivity: Date | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ConversationMaxAggregateOutputType = {
    id: string | null
    type: $Enums.ConversationType | null
    name: string | null
    image: string | null
    createdBy: string | null
    lastActivity: Date | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ConversationCountAggregateOutputType = {
    id: number
    type: number
    participants: number
    name: number
    image: number
    createdBy: number
    lastMessage: number
    lastActivity: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ConversationMinAggregateInputType = {
    id?: true
    type?: true
    name?: true
    image?: true
    createdBy?: true
    lastActivity?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ConversationMaxAggregateInputType = {
    id?: true
    type?: true
    name?: true
    image?: true
    createdBy?: true
    lastActivity?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ConversationCountAggregateInputType = {
    id?: true
    type?: true
    participants?: true
    name?: true
    image?: true
    createdBy?: true
    lastMessage?: true
    lastActivity?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ConversationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Conversation to aggregate.
     */
    where?: ConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Conversations to fetch.
     */
    orderBy?: ConversationOrderByWithRelationInput | ConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Conversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Conversations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Conversations
    **/
    _count?: true | ConversationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ConversationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ConversationMaxAggregateInputType
  }

  export type GetConversationAggregateType<T extends ConversationAggregateArgs> = {
        [P in keyof T & keyof AggregateConversation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateConversation[P]>
      : GetScalarType<T[P], AggregateConversation[P]>
  }




  export type ConversationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConversationWhereInput
    orderBy?: ConversationOrderByWithAggregationInput | ConversationOrderByWithAggregationInput[]
    by: ConversationScalarFieldEnum[] | ConversationScalarFieldEnum
    having?: ConversationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ConversationCountAggregateInputType | true
    _min?: ConversationMinAggregateInputType
    _max?: ConversationMaxAggregateInputType
  }

  export type ConversationGroupByOutputType = {
    id: string
    type: $Enums.ConversationType
    participants: string[]
    name: string | null
    image: string | null
    createdBy: string
    lastMessage: JsonValue | null
    lastActivity: Date
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: ConversationCountAggregateOutputType | null
    _min: ConversationMinAggregateOutputType | null
    _max: ConversationMaxAggregateOutputType | null
  }

  type GetConversationGroupByPayload<T extends ConversationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ConversationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ConversationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ConversationGroupByOutputType[P]>
            : GetScalarType<T[P], ConversationGroupByOutputType[P]>
        }
      >
    >


  export type ConversationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    participants?: boolean
    name?: boolean
    image?: boolean
    createdBy?: boolean
    lastMessage?: boolean
    lastActivity?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    messages?: boolean | Conversation$messagesArgs<ExtArgs>
    _count?: boolean | ConversationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["conversation"]>



  export type ConversationSelectScalar = {
    id?: boolean
    type?: boolean
    participants?: boolean
    name?: boolean
    image?: boolean
    createdBy?: boolean
    lastMessage?: boolean
    lastActivity?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ConversationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "type" | "participants" | "name" | "image" | "createdBy" | "lastMessage" | "lastActivity" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["conversation"]>
  export type ConversationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    messages?: boolean | Conversation$messagesArgs<ExtArgs>
    _count?: boolean | ConversationCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $ConversationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Conversation"
    objects: {
      messages: Prisma.$MessagePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      type: $Enums.ConversationType
      participants: string[]
      name: string | null
      image: string | null
      createdBy: string
      lastMessage: Prisma.JsonValue | null
      lastActivity: Date
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["conversation"]>
    composites: {}
  }

  type ConversationGetPayload<S extends boolean | null | undefined | ConversationDefaultArgs> = $Result.GetResult<Prisma.$ConversationPayload, S>

  type ConversationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ConversationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ConversationCountAggregateInputType | true
    }

  export interface ConversationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Conversation'], meta: { name: 'Conversation' } }
    /**
     * Find zero or one Conversation that matches the filter.
     * @param {ConversationFindUniqueArgs} args - Arguments to find a Conversation
     * @example
     * // Get one Conversation
     * const conversation = await prisma.conversation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ConversationFindUniqueArgs>(args: SelectSubset<T, ConversationFindUniqueArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Conversation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ConversationFindUniqueOrThrowArgs} args - Arguments to find a Conversation
     * @example
     * // Get one Conversation
     * const conversation = await prisma.conversation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ConversationFindUniqueOrThrowArgs>(args: SelectSubset<T, ConversationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Conversation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationFindFirstArgs} args - Arguments to find a Conversation
     * @example
     * // Get one Conversation
     * const conversation = await prisma.conversation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ConversationFindFirstArgs>(args?: SelectSubset<T, ConversationFindFirstArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Conversation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationFindFirstOrThrowArgs} args - Arguments to find a Conversation
     * @example
     * // Get one Conversation
     * const conversation = await prisma.conversation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ConversationFindFirstOrThrowArgs>(args?: SelectSubset<T, ConversationFindFirstOrThrowArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Conversations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Conversations
     * const conversations = await prisma.conversation.findMany()
     * 
     * // Get first 10 Conversations
     * const conversations = await prisma.conversation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const conversationWithIdOnly = await prisma.conversation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ConversationFindManyArgs>(args?: SelectSubset<T, ConversationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Conversation.
     * @param {ConversationCreateArgs} args - Arguments to create a Conversation.
     * @example
     * // Create one Conversation
     * const Conversation = await prisma.conversation.create({
     *   data: {
     *     // ... data to create a Conversation
     *   }
     * })
     * 
     */
    create<T extends ConversationCreateArgs>(args: SelectSubset<T, ConversationCreateArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Conversations.
     * @param {ConversationCreateManyArgs} args - Arguments to create many Conversations.
     * @example
     * // Create many Conversations
     * const conversation = await prisma.conversation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ConversationCreateManyArgs>(args?: SelectSubset<T, ConversationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Conversation.
     * @param {ConversationDeleteArgs} args - Arguments to delete one Conversation.
     * @example
     * // Delete one Conversation
     * const Conversation = await prisma.conversation.delete({
     *   where: {
     *     // ... filter to delete one Conversation
     *   }
     * })
     * 
     */
    delete<T extends ConversationDeleteArgs>(args: SelectSubset<T, ConversationDeleteArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Conversation.
     * @param {ConversationUpdateArgs} args - Arguments to update one Conversation.
     * @example
     * // Update one Conversation
     * const conversation = await prisma.conversation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ConversationUpdateArgs>(args: SelectSubset<T, ConversationUpdateArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Conversations.
     * @param {ConversationDeleteManyArgs} args - Arguments to filter Conversations to delete.
     * @example
     * // Delete a few Conversations
     * const { count } = await prisma.conversation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ConversationDeleteManyArgs>(args?: SelectSubset<T, ConversationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Conversations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Conversations
     * const conversation = await prisma.conversation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ConversationUpdateManyArgs>(args: SelectSubset<T, ConversationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Conversation.
     * @param {ConversationUpsertArgs} args - Arguments to update or create a Conversation.
     * @example
     * // Update or create a Conversation
     * const conversation = await prisma.conversation.upsert({
     *   create: {
     *     // ... data to create a Conversation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Conversation we want to update
     *   }
     * })
     */
    upsert<T extends ConversationUpsertArgs>(args: SelectSubset<T, ConversationUpsertArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Conversations that matches the filter.
     * @param {ConversationFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const conversation = await prisma.conversation.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: ConversationFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Conversation.
     * @param {ConversationAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const conversation = await prisma.conversation.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: ConversationAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Conversations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationCountArgs} args - Arguments to filter Conversations to count.
     * @example
     * // Count the number of Conversations
     * const count = await prisma.conversation.count({
     *   where: {
     *     // ... the filter for the Conversations we want to count
     *   }
     * })
    **/
    count<T extends ConversationCountArgs>(
      args?: Subset<T, ConversationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ConversationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Conversation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ConversationAggregateArgs>(args: Subset<T, ConversationAggregateArgs>): Prisma.PrismaPromise<GetConversationAggregateType<T>>

    /**
     * Group by Conversation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ConversationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ConversationGroupByArgs['orderBy'] }
        : { orderBy?: ConversationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ConversationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConversationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Conversation model
   */
  readonly fields: ConversationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Conversation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ConversationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    messages<T extends Conversation$messagesArgs<ExtArgs> = {}>(args?: Subset<T, Conversation$messagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Conversation model
   */
  interface ConversationFieldRefs {
    readonly id: FieldRef<"Conversation", 'String'>
    readonly type: FieldRef<"Conversation", 'ConversationType'>
    readonly participants: FieldRef<"Conversation", 'String[]'>
    readonly name: FieldRef<"Conversation", 'String'>
    readonly image: FieldRef<"Conversation", 'String'>
    readonly createdBy: FieldRef<"Conversation", 'String'>
    readonly lastMessage: FieldRef<"Conversation", 'Json'>
    readonly lastActivity: FieldRef<"Conversation", 'DateTime'>
    readonly isActive: FieldRef<"Conversation", 'Boolean'>
    readonly createdAt: FieldRef<"Conversation", 'DateTime'>
    readonly updatedAt: FieldRef<"Conversation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Conversation findUnique
   */
  export type ConversationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter, which Conversation to fetch.
     */
    where: ConversationWhereUniqueInput
  }

  /**
   * Conversation findUniqueOrThrow
   */
  export type ConversationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter, which Conversation to fetch.
     */
    where: ConversationWhereUniqueInput
  }

  /**
   * Conversation findFirst
   */
  export type ConversationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter, which Conversation to fetch.
     */
    where?: ConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Conversations to fetch.
     */
    orderBy?: ConversationOrderByWithRelationInput | ConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Conversations.
     */
    cursor?: ConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Conversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Conversations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Conversations.
     */
    distinct?: ConversationScalarFieldEnum | ConversationScalarFieldEnum[]
  }

  /**
   * Conversation findFirstOrThrow
   */
  export type ConversationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter, which Conversation to fetch.
     */
    where?: ConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Conversations to fetch.
     */
    orderBy?: ConversationOrderByWithRelationInput | ConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Conversations.
     */
    cursor?: ConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Conversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Conversations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Conversations.
     */
    distinct?: ConversationScalarFieldEnum | ConversationScalarFieldEnum[]
  }

  /**
   * Conversation findMany
   */
  export type ConversationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter, which Conversations to fetch.
     */
    where?: ConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Conversations to fetch.
     */
    orderBy?: ConversationOrderByWithRelationInput | ConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Conversations.
     */
    cursor?: ConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Conversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Conversations.
     */
    skip?: number
    distinct?: ConversationScalarFieldEnum | ConversationScalarFieldEnum[]
  }

  /**
   * Conversation create
   */
  export type ConversationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * The data needed to create a Conversation.
     */
    data: XOR<ConversationCreateInput, ConversationUncheckedCreateInput>
  }

  /**
   * Conversation createMany
   */
  export type ConversationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Conversations.
     */
    data: ConversationCreateManyInput | ConversationCreateManyInput[]
  }

  /**
   * Conversation update
   */
  export type ConversationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * The data needed to update a Conversation.
     */
    data: XOR<ConversationUpdateInput, ConversationUncheckedUpdateInput>
    /**
     * Choose, which Conversation to update.
     */
    where: ConversationWhereUniqueInput
  }

  /**
   * Conversation updateMany
   */
  export type ConversationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Conversations.
     */
    data: XOR<ConversationUpdateManyMutationInput, ConversationUncheckedUpdateManyInput>
    /**
     * Filter which Conversations to update
     */
    where?: ConversationWhereInput
    /**
     * Limit how many Conversations to update.
     */
    limit?: number
  }

  /**
   * Conversation upsert
   */
  export type ConversationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * The filter to search for the Conversation to update in case it exists.
     */
    where: ConversationWhereUniqueInput
    /**
     * In case the Conversation found by the `where` argument doesn't exist, create a new Conversation with this data.
     */
    create: XOR<ConversationCreateInput, ConversationUncheckedCreateInput>
    /**
     * In case the Conversation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ConversationUpdateInput, ConversationUncheckedUpdateInput>
  }

  /**
   * Conversation delete
   */
  export type ConversationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter which Conversation to delete.
     */
    where: ConversationWhereUniqueInput
  }

  /**
   * Conversation deleteMany
   */
  export type ConversationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Conversations to delete
     */
    where?: ConversationWhereInput
    /**
     * Limit how many Conversations to delete.
     */
    limit?: number
  }

  /**
   * Conversation findRaw
   */
  export type ConversationFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Conversation aggregateRaw
   */
  export type ConversationAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Conversation.messages
   */
  export type Conversation$messagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    cursor?: MessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Conversation without action
   */
  export type ConversationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
  }


  /**
   * Model Message
   */

  export type AggregateMessage = {
    _count: MessageCountAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  export type MessageMinAggregateOutputType = {
    id: string | null
    conversationId: string | null
    senderId: string | null
    content: string | null
    type: $Enums.MessageType | null
    replyToId: string | null
    isEdited: boolean | null
    editedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MessageMaxAggregateOutputType = {
    id: string | null
    conversationId: string | null
    senderId: string | null
    content: string | null
    type: $Enums.MessageType | null
    replyToId: string | null
    isEdited: boolean | null
    editedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MessageCountAggregateOutputType = {
    id: number
    conversationId: number
    senderId: number
    content: number
    type: number
    metadata: number
    replyToId: number
    isEdited: number
    editedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MessageMinAggregateInputType = {
    id?: true
    conversationId?: true
    senderId?: true
    content?: true
    type?: true
    replyToId?: true
    isEdited?: true
    editedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MessageMaxAggregateInputType = {
    id?: true
    conversationId?: true
    senderId?: true
    content?: true
    type?: true
    replyToId?: true
    isEdited?: true
    editedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MessageCountAggregateInputType = {
    id?: true
    conversationId?: true
    senderId?: true
    content?: true
    type?: true
    metadata?: true
    replyToId?: true
    isEdited?: true
    editedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MessageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Message to aggregate.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Messages
    **/
    _count?: true | MessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MessageMaxAggregateInputType
  }

  export type GetMessageAggregateType<T extends MessageAggregateArgs> = {
        [P in keyof T & keyof AggregateMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMessage[P]>
      : GetScalarType<T[P], AggregateMessage[P]>
  }




  export type MessageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithAggregationInput | MessageOrderByWithAggregationInput[]
    by: MessageScalarFieldEnum[] | MessageScalarFieldEnum
    having?: MessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MessageCountAggregateInputType | true
    _min?: MessageMinAggregateInputType
    _max?: MessageMaxAggregateInputType
  }

  export type MessageGroupByOutputType = {
    id: string
    conversationId: string
    senderId: string
    content: string
    type: $Enums.MessageType
    metadata: JsonValue | null
    replyToId: string | null
    isEdited: boolean
    editedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: MessageCountAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  type GetMessageGroupByPayload<T extends MessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MessageGroupByOutputType[P]>
            : GetScalarType<T[P], MessageGroupByOutputType[P]>
        }
      >
    >


  export type MessageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    conversationId?: boolean
    senderId?: boolean
    content?: boolean
    type?: boolean
    metadata?: boolean
    replyToId?: boolean
    isEdited?: boolean
    editedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
    replyTo?: boolean | Message$replyToArgs<ExtArgs>
    replies?: boolean | Message$repliesArgs<ExtArgs>
    reactions?: boolean | Message$reactionsArgs<ExtArgs>
    status?: boolean | Message$statusArgs<ExtArgs>
    _count?: boolean | MessageCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>



  export type MessageSelectScalar = {
    id?: boolean
    conversationId?: boolean
    senderId?: boolean
    content?: boolean
    type?: boolean
    metadata?: boolean
    replyToId?: boolean
    isEdited?: boolean
    editedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MessageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "conversationId" | "senderId" | "content" | "type" | "metadata" | "replyToId" | "isEdited" | "editedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["message"]>
  export type MessageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
    replyTo?: boolean | Message$replyToArgs<ExtArgs>
    replies?: boolean | Message$repliesArgs<ExtArgs>
    reactions?: boolean | Message$reactionsArgs<ExtArgs>
    status?: boolean | Message$statusArgs<ExtArgs>
    _count?: boolean | MessageCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $MessagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Message"
    objects: {
      conversation: Prisma.$ConversationPayload<ExtArgs>
      replyTo: Prisma.$MessagePayload<ExtArgs> | null
      replies: Prisma.$MessagePayload<ExtArgs>[]
      reactions: Prisma.$MessageReactionPayload<ExtArgs>[]
      status: Prisma.$MessageStatusRecordPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      conversationId: string
      senderId: string
      content: string
      type: $Enums.MessageType
      metadata: Prisma.JsonValue | null
      replyToId: string | null
      isEdited: boolean
      editedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["message"]>
    composites: {}
  }

  type MessageGetPayload<S extends boolean | null | undefined | MessageDefaultArgs> = $Result.GetResult<Prisma.$MessagePayload, S>

  type MessageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MessageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MessageCountAggregateInputType | true
    }

  export interface MessageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Message'], meta: { name: 'Message' } }
    /**
     * Find zero or one Message that matches the filter.
     * @param {MessageFindUniqueArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MessageFindUniqueArgs>(args: SelectSubset<T, MessageFindUniqueArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Message that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MessageFindUniqueOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MessageFindUniqueOrThrowArgs>(args: SelectSubset<T, MessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Message that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MessageFindFirstArgs>(args?: SelectSubset<T, MessageFindFirstArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Message that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MessageFindFirstOrThrowArgs>(args?: SelectSubset<T, MessageFindFirstOrThrowArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Messages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Messages
     * const messages = await prisma.message.findMany()
     * 
     * // Get first 10 Messages
     * const messages = await prisma.message.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const messageWithIdOnly = await prisma.message.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MessageFindManyArgs>(args?: SelectSubset<T, MessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Message.
     * @param {MessageCreateArgs} args - Arguments to create a Message.
     * @example
     * // Create one Message
     * const Message = await prisma.message.create({
     *   data: {
     *     // ... data to create a Message
     *   }
     * })
     * 
     */
    create<T extends MessageCreateArgs>(args: SelectSubset<T, MessageCreateArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Messages.
     * @param {MessageCreateManyArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MessageCreateManyArgs>(args?: SelectSubset<T, MessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Message.
     * @param {MessageDeleteArgs} args - Arguments to delete one Message.
     * @example
     * // Delete one Message
     * const Message = await prisma.message.delete({
     *   where: {
     *     // ... filter to delete one Message
     *   }
     * })
     * 
     */
    delete<T extends MessageDeleteArgs>(args: SelectSubset<T, MessageDeleteArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Message.
     * @param {MessageUpdateArgs} args - Arguments to update one Message.
     * @example
     * // Update one Message
     * const message = await prisma.message.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MessageUpdateArgs>(args: SelectSubset<T, MessageUpdateArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Messages.
     * @param {MessageDeleteManyArgs} args - Arguments to filter Messages to delete.
     * @example
     * // Delete a few Messages
     * const { count } = await prisma.message.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MessageDeleteManyArgs>(args?: SelectSubset<T, MessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Messages
     * const message = await prisma.message.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MessageUpdateManyArgs>(args: SelectSubset<T, MessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Message.
     * @param {MessageUpsertArgs} args - Arguments to update or create a Message.
     * @example
     * // Update or create a Message
     * const message = await prisma.message.upsert({
     *   create: {
     *     // ... data to create a Message
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Message we want to update
     *   }
     * })
     */
    upsert<T extends MessageUpsertArgs>(args: SelectSubset<T, MessageUpsertArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Messages that matches the filter.
     * @param {MessageFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const message = await prisma.message.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: MessageFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Message.
     * @param {MessageAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const message = await prisma.message.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: MessageAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageCountArgs} args - Arguments to filter Messages to count.
     * @example
     * // Count the number of Messages
     * const count = await prisma.message.count({
     *   where: {
     *     // ... the filter for the Messages we want to count
     *   }
     * })
    **/
    count<T extends MessageCountArgs>(
      args?: Subset<T, MessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MessageAggregateArgs>(args: Subset<T, MessageAggregateArgs>): Prisma.PrismaPromise<GetMessageAggregateType<T>>

    /**
     * Group by Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MessageGroupByArgs['orderBy'] }
        : { orderBy?: MessageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Message model
   */
  readonly fields: MessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Message.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MessageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    conversation<T extends ConversationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ConversationDefaultArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    replyTo<T extends Message$replyToArgs<ExtArgs> = {}>(args?: Subset<T, Message$replyToArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    replies<T extends Message$repliesArgs<ExtArgs> = {}>(args?: Subset<T, Message$repliesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    reactions<T extends Message$reactionsArgs<ExtArgs> = {}>(args?: Subset<T, Message$reactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessageReactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    status<T extends Message$statusArgs<ExtArgs> = {}>(args?: Subset<T, Message$statusArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessageStatusRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Message model
   */
  interface MessageFieldRefs {
    readonly id: FieldRef<"Message", 'String'>
    readonly conversationId: FieldRef<"Message", 'String'>
    readonly senderId: FieldRef<"Message", 'String'>
    readonly content: FieldRef<"Message", 'String'>
    readonly type: FieldRef<"Message", 'MessageType'>
    readonly metadata: FieldRef<"Message", 'Json'>
    readonly replyToId: FieldRef<"Message", 'String'>
    readonly isEdited: FieldRef<"Message", 'Boolean'>
    readonly editedAt: FieldRef<"Message", 'DateTime'>
    readonly createdAt: FieldRef<"Message", 'DateTime'>
    readonly updatedAt: FieldRef<"Message", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Message findUnique
   */
  export type MessageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message findUniqueOrThrow
   */
  export type MessageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message findFirst
   */
  export type MessageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message findFirstOrThrow
   */
  export type MessageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message findMany
   */
  export type MessageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Messages to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message create
   */
  export type MessageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The data needed to create a Message.
     */
    data: XOR<MessageCreateInput, MessageUncheckedCreateInput>
  }

  /**
   * Message createMany
   */
  export type MessageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Messages.
     */
    data: MessageCreateManyInput | MessageCreateManyInput[]
  }

  /**
   * Message update
   */
  export type MessageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The data needed to update a Message.
     */
    data: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
    /**
     * Choose, which Message to update.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message updateMany
   */
  export type MessageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Messages.
     */
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyInput>
    /**
     * Filter which Messages to update
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to update.
     */
    limit?: number
  }

  /**
   * Message upsert
   */
  export type MessageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The filter to search for the Message to update in case it exists.
     */
    where: MessageWhereUniqueInput
    /**
     * In case the Message found by the `where` argument doesn't exist, create a new Message with this data.
     */
    create: XOR<MessageCreateInput, MessageUncheckedCreateInput>
    /**
     * In case the Message was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
  }

  /**
   * Message delete
   */
  export type MessageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter which Message to delete.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message deleteMany
   */
  export type MessageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Messages to delete
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to delete.
     */
    limit?: number
  }

  /**
   * Message findRaw
   */
  export type MessageFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Message aggregateRaw
   */
  export type MessageAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Message.replyTo
   */
  export type Message$replyToArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    where?: MessageWhereInput
  }

  /**
   * Message.replies
   */
  export type Message$repliesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    cursor?: MessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message.reactions
   */
  export type Message$reactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageReaction
     */
    select?: MessageReactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageReaction
     */
    omit?: MessageReactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageReactionInclude<ExtArgs> | null
    where?: MessageReactionWhereInput
    orderBy?: MessageReactionOrderByWithRelationInput | MessageReactionOrderByWithRelationInput[]
    cursor?: MessageReactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessageReactionScalarFieldEnum | MessageReactionScalarFieldEnum[]
  }

  /**
   * Message.status
   */
  export type Message$statusArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageStatusRecord
     */
    select?: MessageStatusRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageStatusRecord
     */
    omit?: MessageStatusRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageStatusRecordInclude<ExtArgs> | null
    where?: MessageStatusRecordWhereInput
    orderBy?: MessageStatusRecordOrderByWithRelationInput | MessageStatusRecordOrderByWithRelationInput[]
    cursor?: MessageStatusRecordWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessageStatusRecordScalarFieldEnum | MessageStatusRecordScalarFieldEnum[]
  }

  /**
   * Message without action
   */
  export type MessageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
  }


  /**
   * Model MessageStatusRecord
   */

  export type AggregateMessageStatusRecord = {
    _count: MessageStatusRecordCountAggregateOutputType | null
    _min: MessageStatusRecordMinAggregateOutputType | null
    _max: MessageStatusRecordMaxAggregateOutputType | null
  }

  export type MessageStatusRecordMinAggregateOutputType = {
    id: string | null
    messageId: string | null
    userId: string | null
    status: $Enums.MessageStatusType | null
    timestamp: Date | null
  }

  export type MessageStatusRecordMaxAggregateOutputType = {
    id: string | null
    messageId: string | null
    userId: string | null
    status: $Enums.MessageStatusType | null
    timestamp: Date | null
  }

  export type MessageStatusRecordCountAggregateOutputType = {
    id: number
    messageId: number
    userId: number
    status: number
    timestamp: number
    _all: number
  }


  export type MessageStatusRecordMinAggregateInputType = {
    id?: true
    messageId?: true
    userId?: true
    status?: true
    timestamp?: true
  }

  export type MessageStatusRecordMaxAggregateInputType = {
    id?: true
    messageId?: true
    userId?: true
    status?: true
    timestamp?: true
  }

  export type MessageStatusRecordCountAggregateInputType = {
    id?: true
    messageId?: true
    userId?: true
    status?: true
    timestamp?: true
    _all?: true
  }

  export type MessageStatusRecordAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MessageStatusRecord to aggregate.
     */
    where?: MessageStatusRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MessageStatusRecords to fetch.
     */
    orderBy?: MessageStatusRecordOrderByWithRelationInput | MessageStatusRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MessageStatusRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MessageStatusRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MessageStatusRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MessageStatusRecords
    **/
    _count?: true | MessageStatusRecordCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MessageStatusRecordMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MessageStatusRecordMaxAggregateInputType
  }

  export type GetMessageStatusRecordAggregateType<T extends MessageStatusRecordAggregateArgs> = {
        [P in keyof T & keyof AggregateMessageStatusRecord]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMessageStatusRecord[P]>
      : GetScalarType<T[P], AggregateMessageStatusRecord[P]>
  }




  export type MessageStatusRecordGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageStatusRecordWhereInput
    orderBy?: MessageStatusRecordOrderByWithAggregationInput | MessageStatusRecordOrderByWithAggregationInput[]
    by: MessageStatusRecordScalarFieldEnum[] | MessageStatusRecordScalarFieldEnum
    having?: MessageStatusRecordScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MessageStatusRecordCountAggregateInputType | true
    _min?: MessageStatusRecordMinAggregateInputType
    _max?: MessageStatusRecordMaxAggregateInputType
  }

  export type MessageStatusRecordGroupByOutputType = {
    id: string
    messageId: string
    userId: string
    status: $Enums.MessageStatusType
    timestamp: Date
    _count: MessageStatusRecordCountAggregateOutputType | null
    _min: MessageStatusRecordMinAggregateOutputType | null
    _max: MessageStatusRecordMaxAggregateOutputType | null
  }

  type GetMessageStatusRecordGroupByPayload<T extends MessageStatusRecordGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MessageStatusRecordGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MessageStatusRecordGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MessageStatusRecordGroupByOutputType[P]>
            : GetScalarType<T[P], MessageStatusRecordGroupByOutputType[P]>
        }
      >
    >


  export type MessageStatusRecordSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    messageId?: boolean
    userId?: boolean
    status?: boolean
    timestamp?: boolean
    message?: boolean | MessageDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["messageStatusRecord"]>



  export type MessageStatusRecordSelectScalar = {
    id?: boolean
    messageId?: boolean
    userId?: boolean
    status?: boolean
    timestamp?: boolean
  }

  export type MessageStatusRecordOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "messageId" | "userId" | "status" | "timestamp", ExtArgs["result"]["messageStatusRecord"]>
  export type MessageStatusRecordInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    message?: boolean | MessageDefaultArgs<ExtArgs>
  }

  export type $MessageStatusRecordPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MessageStatusRecord"
    objects: {
      message: Prisma.$MessagePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      messageId: string
      userId: string
      status: $Enums.MessageStatusType
      timestamp: Date
    }, ExtArgs["result"]["messageStatusRecord"]>
    composites: {}
  }

  type MessageStatusRecordGetPayload<S extends boolean | null | undefined | MessageStatusRecordDefaultArgs> = $Result.GetResult<Prisma.$MessageStatusRecordPayload, S>

  type MessageStatusRecordCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MessageStatusRecordFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MessageStatusRecordCountAggregateInputType | true
    }

  export interface MessageStatusRecordDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MessageStatusRecord'], meta: { name: 'MessageStatusRecord' } }
    /**
     * Find zero or one MessageStatusRecord that matches the filter.
     * @param {MessageStatusRecordFindUniqueArgs} args - Arguments to find a MessageStatusRecord
     * @example
     * // Get one MessageStatusRecord
     * const messageStatusRecord = await prisma.messageStatusRecord.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MessageStatusRecordFindUniqueArgs>(args: SelectSubset<T, MessageStatusRecordFindUniqueArgs<ExtArgs>>): Prisma__MessageStatusRecordClient<$Result.GetResult<Prisma.$MessageStatusRecordPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MessageStatusRecord that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MessageStatusRecordFindUniqueOrThrowArgs} args - Arguments to find a MessageStatusRecord
     * @example
     * // Get one MessageStatusRecord
     * const messageStatusRecord = await prisma.messageStatusRecord.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MessageStatusRecordFindUniqueOrThrowArgs>(args: SelectSubset<T, MessageStatusRecordFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MessageStatusRecordClient<$Result.GetResult<Prisma.$MessageStatusRecordPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MessageStatusRecord that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageStatusRecordFindFirstArgs} args - Arguments to find a MessageStatusRecord
     * @example
     * // Get one MessageStatusRecord
     * const messageStatusRecord = await prisma.messageStatusRecord.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MessageStatusRecordFindFirstArgs>(args?: SelectSubset<T, MessageStatusRecordFindFirstArgs<ExtArgs>>): Prisma__MessageStatusRecordClient<$Result.GetResult<Prisma.$MessageStatusRecordPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MessageStatusRecord that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageStatusRecordFindFirstOrThrowArgs} args - Arguments to find a MessageStatusRecord
     * @example
     * // Get one MessageStatusRecord
     * const messageStatusRecord = await prisma.messageStatusRecord.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MessageStatusRecordFindFirstOrThrowArgs>(args?: SelectSubset<T, MessageStatusRecordFindFirstOrThrowArgs<ExtArgs>>): Prisma__MessageStatusRecordClient<$Result.GetResult<Prisma.$MessageStatusRecordPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MessageStatusRecords that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageStatusRecordFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MessageStatusRecords
     * const messageStatusRecords = await prisma.messageStatusRecord.findMany()
     * 
     * // Get first 10 MessageStatusRecords
     * const messageStatusRecords = await prisma.messageStatusRecord.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const messageStatusRecordWithIdOnly = await prisma.messageStatusRecord.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MessageStatusRecordFindManyArgs>(args?: SelectSubset<T, MessageStatusRecordFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessageStatusRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MessageStatusRecord.
     * @param {MessageStatusRecordCreateArgs} args - Arguments to create a MessageStatusRecord.
     * @example
     * // Create one MessageStatusRecord
     * const MessageStatusRecord = await prisma.messageStatusRecord.create({
     *   data: {
     *     // ... data to create a MessageStatusRecord
     *   }
     * })
     * 
     */
    create<T extends MessageStatusRecordCreateArgs>(args: SelectSubset<T, MessageStatusRecordCreateArgs<ExtArgs>>): Prisma__MessageStatusRecordClient<$Result.GetResult<Prisma.$MessageStatusRecordPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MessageStatusRecords.
     * @param {MessageStatusRecordCreateManyArgs} args - Arguments to create many MessageStatusRecords.
     * @example
     * // Create many MessageStatusRecords
     * const messageStatusRecord = await prisma.messageStatusRecord.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MessageStatusRecordCreateManyArgs>(args?: SelectSubset<T, MessageStatusRecordCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a MessageStatusRecord.
     * @param {MessageStatusRecordDeleteArgs} args - Arguments to delete one MessageStatusRecord.
     * @example
     * // Delete one MessageStatusRecord
     * const MessageStatusRecord = await prisma.messageStatusRecord.delete({
     *   where: {
     *     // ... filter to delete one MessageStatusRecord
     *   }
     * })
     * 
     */
    delete<T extends MessageStatusRecordDeleteArgs>(args: SelectSubset<T, MessageStatusRecordDeleteArgs<ExtArgs>>): Prisma__MessageStatusRecordClient<$Result.GetResult<Prisma.$MessageStatusRecordPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MessageStatusRecord.
     * @param {MessageStatusRecordUpdateArgs} args - Arguments to update one MessageStatusRecord.
     * @example
     * // Update one MessageStatusRecord
     * const messageStatusRecord = await prisma.messageStatusRecord.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MessageStatusRecordUpdateArgs>(args: SelectSubset<T, MessageStatusRecordUpdateArgs<ExtArgs>>): Prisma__MessageStatusRecordClient<$Result.GetResult<Prisma.$MessageStatusRecordPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MessageStatusRecords.
     * @param {MessageStatusRecordDeleteManyArgs} args - Arguments to filter MessageStatusRecords to delete.
     * @example
     * // Delete a few MessageStatusRecords
     * const { count } = await prisma.messageStatusRecord.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MessageStatusRecordDeleteManyArgs>(args?: SelectSubset<T, MessageStatusRecordDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MessageStatusRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageStatusRecordUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MessageStatusRecords
     * const messageStatusRecord = await prisma.messageStatusRecord.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MessageStatusRecordUpdateManyArgs>(args: SelectSubset<T, MessageStatusRecordUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one MessageStatusRecord.
     * @param {MessageStatusRecordUpsertArgs} args - Arguments to update or create a MessageStatusRecord.
     * @example
     * // Update or create a MessageStatusRecord
     * const messageStatusRecord = await prisma.messageStatusRecord.upsert({
     *   create: {
     *     // ... data to create a MessageStatusRecord
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MessageStatusRecord we want to update
     *   }
     * })
     */
    upsert<T extends MessageStatusRecordUpsertArgs>(args: SelectSubset<T, MessageStatusRecordUpsertArgs<ExtArgs>>): Prisma__MessageStatusRecordClient<$Result.GetResult<Prisma.$MessageStatusRecordPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MessageStatusRecords that matches the filter.
     * @param {MessageStatusRecordFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const messageStatusRecord = await prisma.messageStatusRecord.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: MessageStatusRecordFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a MessageStatusRecord.
     * @param {MessageStatusRecordAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const messageStatusRecord = await prisma.messageStatusRecord.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: MessageStatusRecordAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of MessageStatusRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageStatusRecordCountArgs} args - Arguments to filter MessageStatusRecords to count.
     * @example
     * // Count the number of MessageStatusRecords
     * const count = await prisma.messageStatusRecord.count({
     *   where: {
     *     // ... the filter for the MessageStatusRecords we want to count
     *   }
     * })
    **/
    count<T extends MessageStatusRecordCountArgs>(
      args?: Subset<T, MessageStatusRecordCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MessageStatusRecordCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MessageStatusRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageStatusRecordAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MessageStatusRecordAggregateArgs>(args: Subset<T, MessageStatusRecordAggregateArgs>): Prisma.PrismaPromise<GetMessageStatusRecordAggregateType<T>>

    /**
     * Group by MessageStatusRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageStatusRecordGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MessageStatusRecordGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MessageStatusRecordGroupByArgs['orderBy'] }
        : { orderBy?: MessageStatusRecordGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MessageStatusRecordGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMessageStatusRecordGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MessageStatusRecord model
   */
  readonly fields: MessageStatusRecordFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MessageStatusRecord.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MessageStatusRecordClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    message<T extends MessageDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MessageDefaultArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MessageStatusRecord model
   */
  interface MessageStatusRecordFieldRefs {
    readonly id: FieldRef<"MessageStatusRecord", 'String'>
    readonly messageId: FieldRef<"MessageStatusRecord", 'String'>
    readonly userId: FieldRef<"MessageStatusRecord", 'String'>
    readonly status: FieldRef<"MessageStatusRecord", 'MessageStatusType'>
    readonly timestamp: FieldRef<"MessageStatusRecord", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MessageStatusRecord findUnique
   */
  export type MessageStatusRecordFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageStatusRecord
     */
    select?: MessageStatusRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageStatusRecord
     */
    omit?: MessageStatusRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageStatusRecordInclude<ExtArgs> | null
    /**
     * Filter, which MessageStatusRecord to fetch.
     */
    where: MessageStatusRecordWhereUniqueInput
  }

  /**
   * MessageStatusRecord findUniqueOrThrow
   */
  export type MessageStatusRecordFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageStatusRecord
     */
    select?: MessageStatusRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageStatusRecord
     */
    omit?: MessageStatusRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageStatusRecordInclude<ExtArgs> | null
    /**
     * Filter, which MessageStatusRecord to fetch.
     */
    where: MessageStatusRecordWhereUniqueInput
  }

  /**
   * MessageStatusRecord findFirst
   */
  export type MessageStatusRecordFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageStatusRecord
     */
    select?: MessageStatusRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageStatusRecord
     */
    omit?: MessageStatusRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageStatusRecordInclude<ExtArgs> | null
    /**
     * Filter, which MessageStatusRecord to fetch.
     */
    where?: MessageStatusRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MessageStatusRecords to fetch.
     */
    orderBy?: MessageStatusRecordOrderByWithRelationInput | MessageStatusRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MessageStatusRecords.
     */
    cursor?: MessageStatusRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MessageStatusRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MessageStatusRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MessageStatusRecords.
     */
    distinct?: MessageStatusRecordScalarFieldEnum | MessageStatusRecordScalarFieldEnum[]
  }

  /**
   * MessageStatusRecord findFirstOrThrow
   */
  export type MessageStatusRecordFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageStatusRecord
     */
    select?: MessageStatusRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageStatusRecord
     */
    omit?: MessageStatusRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageStatusRecordInclude<ExtArgs> | null
    /**
     * Filter, which MessageStatusRecord to fetch.
     */
    where?: MessageStatusRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MessageStatusRecords to fetch.
     */
    orderBy?: MessageStatusRecordOrderByWithRelationInput | MessageStatusRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MessageStatusRecords.
     */
    cursor?: MessageStatusRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MessageStatusRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MessageStatusRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MessageStatusRecords.
     */
    distinct?: MessageStatusRecordScalarFieldEnum | MessageStatusRecordScalarFieldEnum[]
  }

  /**
   * MessageStatusRecord findMany
   */
  export type MessageStatusRecordFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageStatusRecord
     */
    select?: MessageStatusRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageStatusRecord
     */
    omit?: MessageStatusRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageStatusRecordInclude<ExtArgs> | null
    /**
     * Filter, which MessageStatusRecords to fetch.
     */
    where?: MessageStatusRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MessageStatusRecords to fetch.
     */
    orderBy?: MessageStatusRecordOrderByWithRelationInput | MessageStatusRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MessageStatusRecords.
     */
    cursor?: MessageStatusRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MessageStatusRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MessageStatusRecords.
     */
    skip?: number
    distinct?: MessageStatusRecordScalarFieldEnum | MessageStatusRecordScalarFieldEnum[]
  }

  /**
   * MessageStatusRecord create
   */
  export type MessageStatusRecordCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageStatusRecord
     */
    select?: MessageStatusRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageStatusRecord
     */
    omit?: MessageStatusRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageStatusRecordInclude<ExtArgs> | null
    /**
     * The data needed to create a MessageStatusRecord.
     */
    data: XOR<MessageStatusRecordCreateInput, MessageStatusRecordUncheckedCreateInput>
  }

  /**
   * MessageStatusRecord createMany
   */
  export type MessageStatusRecordCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MessageStatusRecords.
     */
    data: MessageStatusRecordCreateManyInput | MessageStatusRecordCreateManyInput[]
  }

  /**
   * MessageStatusRecord update
   */
  export type MessageStatusRecordUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageStatusRecord
     */
    select?: MessageStatusRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageStatusRecord
     */
    omit?: MessageStatusRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageStatusRecordInclude<ExtArgs> | null
    /**
     * The data needed to update a MessageStatusRecord.
     */
    data: XOR<MessageStatusRecordUpdateInput, MessageStatusRecordUncheckedUpdateInput>
    /**
     * Choose, which MessageStatusRecord to update.
     */
    where: MessageStatusRecordWhereUniqueInput
  }

  /**
   * MessageStatusRecord updateMany
   */
  export type MessageStatusRecordUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MessageStatusRecords.
     */
    data: XOR<MessageStatusRecordUpdateManyMutationInput, MessageStatusRecordUncheckedUpdateManyInput>
    /**
     * Filter which MessageStatusRecords to update
     */
    where?: MessageStatusRecordWhereInput
    /**
     * Limit how many MessageStatusRecords to update.
     */
    limit?: number
  }

  /**
   * MessageStatusRecord upsert
   */
  export type MessageStatusRecordUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageStatusRecord
     */
    select?: MessageStatusRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageStatusRecord
     */
    omit?: MessageStatusRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageStatusRecordInclude<ExtArgs> | null
    /**
     * The filter to search for the MessageStatusRecord to update in case it exists.
     */
    where: MessageStatusRecordWhereUniqueInput
    /**
     * In case the MessageStatusRecord found by the `where` argument doesn't exist, create a new MessageStatusRecord with this data.
     */
    create: XOR<MessageStatusRecordCreateInput, MessageStatusRecordUncheckedCreateInput>
    /**
     * In case the MessageStatusRecord was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MessageStatusRecordUpdateInput, MessageStatusRecordUncheckedUpdateInput>
  }

  /**
   * MessageStatusRecord delete
   */
  export type MessageStatusRecordDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageStatusRecord
     */
    select?: MessageStatusRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageStatusRecord
     */
    omit?: MessageStatusRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageStatusRecordInclude<ExtArgs> | null
    /**
     * Filter which MessageStatusRecord to delete.
     */
    where: MessageStatusRecordWhereUniqueInput
  }

  /**
   * MessageStatusRecord deleteMany
   */
  export type MessageStatusRecordDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MessageStatusRecords to delete
     */
    where?: MessageStatusRecordWhereInput
    /**
     * Limit how many MessageStatusRecords to delete.
     */
    limit?: number
  }

  /**
   * MessageStatusRecord findRaw
   */
  export type MessageStatusRecordFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * MessageStatusRecord aggregateRaw
   */
  export type MessageStatusRecordAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * MessageStatusRecord without action
   */
  export type MessageStatusRecordDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageStatusRecord
     */
    select?: MessageStatusRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageStatusRecord
     */
    omit?: MessageStatusRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageStatusRecordInclude<ExtArgs> | null
  }


  /**
   * Model MessageReaction
   */

  export type AggregateMessageReaction = {
    _count: MessageReactionCountAggregateOutputType | null
    _min: MessageReactionMinAggregateOutputType | null
    _max: MessageReactionMaxAggregateOutputType | null
  }

  export type MessageReactionMinAggregateOutputType = {
    id: string | null
    messageId: string | null
    userId: string | null
    emoji: string | null
    createdAt: Date | null
  }

  export type MessageReactionMaxAggregateOutputType = {
    id: string | null
    messageId: string | null
    userId: string | null
    emoji: string | null
    createdAt: Date | null
  }

  export type MessageReactionCountAggregateOutputType = {
    id: number
    messageId: number
    userId: number
    emoji: number
    createdAt: number
    _all: number
  }


  export type MessageReactionMinAggregateInputType = {
    id?: true
    messageId?: true
    userId?: true
    emoji?: true
    createdAt?: true
  }

  export type MessageReactionMaxAggregateInputType = {
    id?: true
    messageId?: true
    userId?: true
    emoji?: true
    createdAt?: true
  }

  export type MessageReactionCountAggregateInputType = {
    id?: true
    messageId?: true
    userId?: true
    emoji?: true
    createdAt?: true
    _all?: true
  }

  export type MessageReactionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MessageReaction to aggregate.
     */
    where?: MessageReactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MessageReactions to fetch.
     */
    orderBy?: MessageReactionOrderByWithRelationInput | MessageReactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MessageReactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MessageReactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MessageReactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MessageReactions
    **/
    _count?: true | MessageReactionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MessageReactionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MessageReactionMaxAggregateInputType
  }

  export type GetMessageReactionAggregateType<T extends MessageReactionAggregateArgs> = {
        [P in keyof T & keyof AggregateMessageReaction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMessageReaction[P]>
      : GetScalarType<T[P], AggregateMessageReaction[P]>
  }




  export type MessageReactionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageReactionWhereInput
    orderBy?: MessageReactionOrderByWithAggregationInput | MessageReactionOrderByWithAggregationInput[]
    by: MessageReactionScalarFieldEnum[] | MessageReactionScalarFieldEnum
    having?: MessageReactionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MessageReactionCountAggregateInputType | true
    _min?: MessageReactionMinAggregateInputType
    _max?: MessageReactionMaxAggregateInputType
  }

  export type MessageReactionGroupByOutputType = {
    id: string
    messageId: string
    userId: string
    emoji: string
    createdAt: Date
    _count: MessageReactionCountAggregateOutputType | null
    _min: MessageReactionMinAggregateOutputType | null
    _max: MessageReactionMaxAggregateOutputType | null
  }

  type GetMessageReactionGroupByPayload<T extends MessageReactionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MessageReactionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MessageReactionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MessageReactionGroupByOutputType[P]>
            : GetScalarType<T[P], MessageReactionGroupByOutputType[P]>
        }
      >
    >


  export type MessageReactionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    messageId?: boolean
    userId?: boolean
    emoji?: boolean
    createdAt?: boolean
    message?: boolean | MessageDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["messageReaction"]>



  export type MessageReactionSelectScalar = {
    id?: boolean
    messageId?: boolean
    userId?: boolean
    emoji?: boolean
    createdAt?: boolean
  }

  export type MessageReactionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "messageId" | "userId" | "emoji" | "createdAt", ExtArgs["result"]["messageReaction"]>
  export type MessageReactionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    message?: boolean | MessageDefaultArgs<ExtArgs>
  }

  export type $MessageReactionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MessageReaction"
    objects: {
      message: Prisma.$MessagePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      messageId: string
      userId: string
      emoji: string
      createdAt: Date
    }, ExtArgs["result"]["messageReaction"]>
    composites: {}
  }

  type MessageReactionGetPayload<S extends boolean | null | undefined | MessageReactionDefaultArgs> = $Result.GetResult<Prisma.$MessageReactionPayload, S>

  type MessageReactionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MessageReactionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MessageReactionCountAggregateInputType | true
    }

  export interface MessageReactionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MessageReaction'], meta: { name: 'MessageReaction' } }
    /**
     * Find zero or one MessageReaction that matches the filter.
     * @param {MessageReactionFindUniqueArgs} args - Arguments to find a MessageReaction
     * @example
     * // Get one MessageReaction
     * const messageReaction = await prisma.messageReaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MessageReactionFindUniqueArgs>(args: SelectSubset<T, MessageReactionFindUniqueArgs<ExtArgs>>): Prisma__MessageReactionClient<$Result.GetResult<Prisma.$MessageReactionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MessageReaction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MessageReactionFindUniqueOrThrowArgs} args - Arguments to find a MessageReaction
     * @example
     * // Get one MessageReaction
     * const messageReaction = await prisma.messageReaction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MessageReactionFindUniqueOrThrowArgs>(args: SelectSubset<T, MessageReactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MessageReactionClient<$Result.GetResult<Prisma.$MessageReactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MessageReaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageReactionFindFirstArgs} args - Arguments to find a MessageReaction
     * @example
     * // Get one MessageReaction
     * const messageReaction = await prisma.messageReaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MessageReactionFindFirstArgs>(args?: SelectSubset<T, MessageReactionFindFirstArgs<ExtArgs>>): Prisma__MessageReactionClient<$Result.GetResult<Prisma.$MessageReactionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MessageReaction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageReactionFindFirstOrThrowArgs} args - Arguments to find a MessageReaction
     * @example
     * // Get one MessageReaction
     * const messageReaction = await prisma.messageReaction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MessageReactionFindFirstOrThrowArgs>(args?: SelectSubset<T, MessageReactionFindFirstOrThrowArgs<ExtArgs>>): Prisma__MessageReactionClient<$Result.GetResult<Prisma.$MessageReactionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MessageReactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageReactionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MessageReactions
     * const messageReactions = await prisma.messageReaction.findMany()
     * 
     * // Get first 10 MessageReactions
     * const messageReactions = await prisma.messageReaction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const messageReactionWithIdOnly = await prisma.messageReaction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MessageReactionFindManyArgs>(args?: SelectSubset<T, MessageReactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessageReactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MessageReaction.
     * @param {MessageReactionCreateArgs} args - Arguments to create a MessageReaction.
     * @example
     * // Create one MessageReaction
     * const MessageReaction = await prisma.messageReaction.create({
     *   data: {
     *     // ... data to create a MessageReaction
     *   }
     * })
     * 
     */
    create<T extends MessageReactionCreateArgs>(args: SelectSubset<T, MessageReactionCreateArgs<ExtArgs>>): Prisma__MessageReactionClient<$Result.GetResult<Prisma.$MessageReactionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MessageReactions.
     * @param {MessageReactionCreateManyArgs} args - Arguments to create many MessageReactions.
     * @example
     * // Create many MessageReactions
     * const messageReaction = await prisma.messageReaction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MessageReactionCreateManyArgs>(args?: SelectSubset<T, MessageReactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a MessageReaction.
     * @param {MessageReactionDeleteArgs} args - Arguments to delete one MessageReaction.
     * @example
     * // Delete one MessageReaction
     * const MessageReaction = await prisma.messageReaction.delete({
     *   where: {
     *     // ... filter to delete one MessageReaction
     *   }
     * })
     * 
     */
    delete<T extends MessageReactionDeleteArgs>(args: SelectSubset<T, MessageReactionDeleteArgs<ExtArgs>>): Prisma__MessageReactionClient<$Result.GetResult<Prisma.$MessageReactionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MessageReaction.
     * @param {MessageReactionUpdateArgs} args - Arguments to update one MessageReaction.
     * @example
     * // Update one MessageReaction
     * const messageReaction = await prisma.messageReaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MessageReactionUpdateArgs>(args: SelectSubset<T, MessageReactionUpdateArgs<ExtArgs>>): Prisma__MessageReactionClient<$Result.GetResult<Prisma.$MessageReactionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MessageReactions.
     * @param {MessageReactionDeleteManyArgs} args - Arguments to filter MessageReactions to delete.
     * @example
     * // Delete a few MessageReactions
     * const { count } = await prisma.messageReaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MessageReactionDeleteManyArgs>(args?: SelectSubset<T, MessageReactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MessageReactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageReactionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MessageReactions
     * const messageReaction = await prisma.messageReaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MessageReactionUpdateManyArgs>(args: SelectSubset<T, MessageReactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one MessageReaction.
     * @param {MessageReactionUpsertArgs} args - Arguments to update or create a MessageReaction.
     * @example
     * // Update or create a MessageReaction
     * const messageReaction = await prisma.messageReaction.upsert({
     *   create: {
     *     // ... data to create a MessageReaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MessageReaction we want to update
     *   }
     * })
     */
    upsert<T extends MessageReactionUpsertArgs>(args: SelectSubset<T, MessageReactionUpsertArgs<ExtArgs>>): Prisma__MessageReactionClient<$Result.GetResult<Prisma.$MessageReactionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MessageReactions that matches the filter.
     * @param {MessageReactionFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const messageReaction = await prisma.messageReaction.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: MessageReactionFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a MessageReaction.
     * @param {MessageReactionAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const messageReaction = await prisma.messageReaction.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: MessageReactionAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of MessageReactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageReactionCountArgs} args - Arguments to filter MessageReactions to count.
     * @example
     * // Count the number of MessageReactions
     * const count = await prisma.messageReaction.count({
     *   where: {
     *     // ... the filter for the MessageReactions we want to count
     *   }
     * })
    **/
    count<T extends MessageReactionCountArgs>(
      args?: Subset<T, MessageReactionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MessageReactionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MessageReaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageReactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MessageReactionAggregateArgs>(args: Subset<T, MessageReactionAggregateArgs>): Prisma.PrismaPromise<GetMessageReactionAggregateType<T>>

    /**
     * Group by MessageReaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageReactionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MessageReactionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MessageReactionGroupByArgs['orderBy'] }
        : { orderBy?: MessageReactionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MessageReactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMessageReactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MessageReaction model
   */
  readonly fields: MessageReactionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MessageReaction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MessageReactionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    message<T extends MessageDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MessageDefaultArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MessageReaction model
   */
  interface MessageReactionFieldRefs {
    readonly id: FieldRef<"MessageReaction", 'String'>
    readonly messageId: FieldRef<"MessageReaction", 'String'>
    readonly userId: FieldRef<"MessageReaction", 'String'>
    readonly emoji: FieldRef<"MessageReaction", 'String'>
    readonly createdAt: FieldRef<"MessageReaction", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MessageReaction findUnique
   */
  export type MessageReactionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageReaction
     */
    select?: MessageReactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageReaction
     */
    omit?: MessageReactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageReactionInclude<ExtArgs> | null
    /**
     * Filter, which MessageReaction to fetch.
     */
    where: MessageReactionWhereUniqueInput
  }

  /**
   * MessageReaction findUniqueOrThrow
   */
  export type MessageReactionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageReaction
     */
    select?: MessageReactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageReaction
     */
    omit?: MessageReactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageReactionInclude<ExtArgs> | null
    /**
     * Filter, which MessageReaction to fetch.
     */
    where: MessageReactionWhereUniqueInput
  }

  /**
   * MessageReaction findFirst
   */
  export type MessageReactionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageReaction
     */
    select?: MessageReactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageReaction
     */
    omit?: MessageReactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageReactionInclude<ExtArgs> | null
    /**
     * Filter, which MessageReaction to fetch.
     */
    where?: MessageReactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MessageReactions to fetch.
     */
    orderBy?: MessageReactionOrderByWithRelationInput | MessageReactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MessageReactions.
     */
    cursor?: MessageReactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MessageReactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MessageReactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MessageReactions.
     */
    distinct?: MessageReactionScalarFieldEnum | MessageReactionScalarFieldEnum[]
  }

  /**
   * MessageReaction findFirstOrThrow
   */
  export type MessageReactionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageReaction
     */
    select?: MessageReactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageReaction
     */
    omit?: MessageReactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageReactionInclude<ExtArgs> | null
    /**
     * Filter, which MessageReaction to fetch.
     */
    where?: MessageReactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MessageReactions to fetch.
     */
    orderBy?: MessageReactionOrderByWithRelationInput | MessageReactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MessageReactions.
     */
    cursor?: MessageReactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MessageReactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MessageReactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MessageReactions.
     */
    distinct?: MessageReactionScalarFieldEnum | MessageReactionScalarFieldEnum[]
  }

  /**
   * MessageReaction findMany
   */
  export type MessageReactionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageReaction
     */
    select?: MessageReactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageReaction
     */
    omit?: MessageReactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageReactionInclude<ExtArgs> | null
    /**
     * Filter, which MessageReactions to fetch.
     */
    where?: MessageReactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MessageReactions to fetch.
     */
    orderBy?: MessageReactionOrderByWithRelationInput | MessageReactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MessageReactions.
     */
    cursor?: MessageReactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MessageReactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MessageReactions.
     */
    skip?: number
    distinct?: MessageReactionScalarFieldEnum | MessageReactionScalarFieldEnum[]
  }

  /**
   * MessageReaction create
   */
  export type MessageReactionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageReaction
     */
    select?: MessageReactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageReaction
     */
    omit?: MessageReactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageReactionInclude<ExtArgs> | null
    /**
     * The data needed to create a MessageReaction.
     */
    data: XOR<MessageReactionCreateInput, MessageReactionUncheckedCreateInput>
  }

  /**
   * MessageReaction createMany
   */
  export type MessageReactionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MessageReactions.
     */
    data: MessageReactionCreateManyInput | MessageReactionCreateManyInput[]
  }

  /**
   * MessageReaction update
   */
  export type MessageReactionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageReaction
     */
    select?: MessageReactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageReaction
     */
    omit?: MessageReactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageReactionInclude<ExtArgs> | null
    /**
     * The data needed to update a MessageReaction.
     */
    data: XOR<MessageReactionUpdateInput, MessageReactionUncheckedUpdateInput>
    /**
     * Choose, which MessageReaction to update.
     */
    where: MessageReactionWhereUniqueInput
  }

  /**
   * MessageReaction updateMany
   */
  export type MessageReactionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MessageReactions.
     */
    data: XOR<MessageReactionUpdateManyMutationInput, MessageReactionUncheckedUpdateManyInput>
    /**
     * Filter which MessageReactions to update
     */
    where?: MessageReactionWhereInput
    /**
     * Limit how many MessageReactions to update.
     */
    limit?: number
  }

  /**
   * MessageReaction upsert
   */
  export type MessageReactionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageReaction
     */
    select?: MessageReactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageReaction
     */
    omit?: MessageReactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageReactionInclude<ExtArgs> | null
    /**
     * The filter to search for the MessageReaction to update in case it exists.
     */
    where: MessageReactionWhereUniqueInput
    /**
     * In case the MessageReaction found by the `where` argument doesn't exist, create a new MessageReaction with this data.
     */
    create: XOR<MessageReactionCreateInput, MessageReactionUncheckedCreateInput>
    /**
     * In case the MessageReaction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MessageReactionUpdateInput, MessageReactionUncheckedUpdateInput>
  }

  /**
   * MessageReaction delete
   */
  export type MessageReactionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageReaction
     */
    select?: MessageReactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageReaction
     */
    omit?: MessageReactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageReactionInclude<ExtArgs> | null
    /**
     * Filter which MessageReaction to delete.
     */
    where: MessageReactionWhereUniqueInput
  }

  /**
   * MessageReaction deleteMany
   */
  export type MessageReactionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MessageReactions to delete
     */
    where?: MessageReactionWhereInput
    /**
     * Limit how many MessageReactions to delete.
     */
    limit?: number
  }

  /**
   * MessageReaction findRaw
   */
  export type MessageReactionFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * MessageReaction aggregateRaw
   */
  export type MessageReactionAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * MessageReaction without action
   */
  export type MessageReactionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageReaction
     */
    select?: MessageReactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageReaction
     */
    omit?: MessageReactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageReactionInclude<ExtArgs> | null
  }


  /**
   * Model UserPresence
   */

  export type AggregateUserPresence = {
    _count: UserPresenceCountAggregateOutputType | null
    _min: UserPresenceMinAggregateOutputType | null
    _max: UserPresenceMaxAggregateOutputType | null
  }

  export type UserPresenceMinAggregateOutputType = {
    id: string | null
    userId: string | null
    isOnline: boolean | null
    lastSeen: Date | null
    status: string | null
    currentDevice: string | null
    updatedAt: Date | null
  }

  export type UserPresenceMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    isOnline: boolean | null
    lastSeen: Date | null
    status: string | null
    currentDevice: string | null
    updatedAt: Date | null
  }

  export type UserPresenceCountAggregateOutputType = {
    id: number
    userId: number
    isOnline: number
    lastSeen: number
    status: number
    currentDevice: number
    updatedAt: number
    _all: number
  }


  export type UserPresenceMinAggregateInputType = {
    id?: true
    userId?: true
    isOnline?: true
    lastSeen?: true
    status?: true
    currentDevice?: true
    updatedAt?: true
  }

  export type UserPresenceMaxAggregateInputType = {
    id?: true
    userId?: true
    isOnline?: true
    lastSeen?: true
    status?: true
    currentDevice?: true
    updatedAt?: true
  }

  export type UserPresenceCountAggregateInputType = {
    id?: true
    userId?: true
    isOnline?: true
    lastSeen?: true
    status?: true
    currentDevice?: true
    updatedAt?: true
    _all?: true
  }

  export type UserPresenceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserPresence to aggregate.
     */
    where?: UserPresenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserPresences to fetch.
     */
    orderBy?: UserPresenceOrderByWithRelationInput | UserPresenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserPresenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserPresences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserPresences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserPresences
    **/
    _count?: true | UserPresenceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserPresenceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserPresenceMaxAggregateInputType
  }

  export type GetUserPresenceAggregateType<T extends UserPresenceAggregateArgs> = {
        [P in keyof T & keyof AggregateUserPresence]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserPresence[P]>
      : GetScalarType<T[P], AggregateUserPresence[P]>
  }




  export type UserPresenceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserPresenceWhereInput
    orderBy?: UserPresenceOrderByWithAggregationInput | UserPresenceOrderByWithAggregationInput[]
    by: UserPresenceScalarFieldEnum[] | UserPresenceScalarFieldEnum
    having?: UserPresenceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserPresenceCountAggregateInputType | true
    _min?: UserPresenceMinAggregateInputType
    _max?: UserPresenceMaxAggregateInputType
  }

  export type UserPresenceGroupByOutputType = {
    id: string
    userId: string
    isOnline: boolean
    lastSeen: Date
    status: string | null
    currentDevice: string | null
    updatedAt: Date
    _count: UserPresenceCountAggregateOutputType | null
    _min: UserPresenceMinAggregateOutputType | null
    _max: UserPresenceMaxAggregateOutputType | null
  }

  type GetUserPresenceGroupByPayload<T extends UserPresenceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserPresenceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserPresenceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserPresenceGroupByOutputType[P]>
            : GetScalarType<T[P], UserPresenceGroupByOutputType[P]>
        }
      >
    >


  export type UserPresenceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    isOnline?: boolean
    lastSeen?: boolean
    status?: boolean
    currentDevice?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["userPresence"]>



  export type UserPresenceSelectScalar = {
    id?: boolean
    userId?: boolean
    isOnline?: boolean
    lastSeen?: boolean
    status?: boolean
    currentDevice?: boolean
    updatedAt?: boolean
  }

  export type UserPresenceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "isOnline" | "lastSeen" | "status" | "currentDevice" | "updatedAt", ExtArgs["result"]["userPresence"]>

  export type $UserPresencePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserPresence"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      isOnline: boolean
      lastSeen: Date
      status: string | null
      currentDevice: string | null
      updatedAt: Date
    }, ExtArgs["result"]["userPresence"]>
    composites: {}
  }

  type UserPresenceGetPayload<S extends boolean | null | undefined | UserPresenceDefaultArgs> = $Result.GetResult<Prisma.$UserPresencePayload, S>

  type UserPresenceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserPresenceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserPresenceCountAggregateInputType | true
    }

  export interface UserPresenceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserPresence'], meta: { name: 'UserPresence' } }
    /**
     * Find zero or one UserPresence that matches the filter.
     * @param {UserPresenceFindUniqueArgs} args - Arguments to find a UserPresence
     * @example
     * // Get one UserPresence
     * const userPresence = await prisma.userPresence.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserPresenceFindUniqueArgs>(args: SelectSubset<T, UserPresenceFindUniqueArgs<ExtArgs>>): Prisma__UserPresenceClient<$Result.GetResult<Prisma.$UserPresencePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserPresence that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserPresenceFindUniqueOrThrowArgs} args - Arguments to find a UserPresence
     * @example
     * // Get one UserPresence
     * const userPresence = await prisma.userPresence.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserPresenceFindUniqueOrThrowArgs>(args: SelectSubset<T, UserPresenceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserPresenceClient<$Result.GetResult<Prisma.$UserPresencePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserPresence that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserPresenceFindFirstArgs} args - Arguments to find a UserPresence
     * @example
     * // Get one UserPresence
     * const userPresence = await prisma.userPresence.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserPresenceFindFirstArgs>(args?: SelectSubset<T, UserPresenceFindFirstArgs<ExtArgs>>): Prisma__UserPresenceClient<$Result.GetResult<Prisma.$UserPresencePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserPresence that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserPresenceFindFirstOrThrowArgs} args - Arguments to find a UserPresence
     * @example
     * // Get one UserPresence
     * const userPresence = await prisma.userPresence.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserPresenceFindFirstOrThrowArgs>(args?: SelectSubset<T, UserPresenceFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserPresenceClient<$Result.GetResult<Prisma.$UserPresencePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserPresences that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserPresenceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserPresences
     * const userPresences = await prisma.userPresence.findMany()
     * 
     * // Get first 10 UserPresences
     * const userPresences = await prisma.userPresence.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userPresenceWithIdOnly = await prisma.userPresence.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserPresenceFindManyArgs>(args?: SelectSubset<T, UserPresenceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPresencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserPresence.
     * @param {UserPresenceCreateArgs} args - Arguments to create a UserPresence.
     * @example
     * // Create one UserPresence
     * const UserPresence = await prisma.userPresence.create({
     *   data: {
     *     // ... data to create a UserPresence
     *   }
     * })
     * 
     */
    create<T extends UserPresenceCreateArgs>(args: SelectSubset<T, UserPresenceCreateArgs<ExtArgs>>): Prisma__UserPresenceClient<$Result.GetResult<Prisma.$UserPresencePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserPresences.
     * @param {UserPresenceCreateManyArgs} args - Arguments to create many UserPresences.
     * @example
     * // Create many UserPresences
     * const userPresence = await prisma.userPresence.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserPresenceCreateManyArgs>(args?: SelectSubset<T, UserPresenceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a UserPresence.
     * @param {UserPresenceDeleteArgs} args - Arguments to delete one UserPresence.
     * @example
     * // Delete one UserPresence
     * const UserPresence = await prisma.userPresence.delete({
     *   where: {
     *     // ... filter to delete one UserPresence
     *   }
     * })
     * 
     */
    delete<T extends UserPresenceDeleteArgs>(args: SelectSubset<T, UserPresenceDeleteArgs<ExtArgs>>): Prisma__UserPresenceClient<$Result.GetResult<Prisma.$UserPresencePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserPresence.
     * @param {UserPresenceUpdateArgs} args - Arguments to update one UserPresence.
     * @example
     * // Update one UserPresence
     * const userPresence = await prisma.userPresence.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserPresenceUpdateArgs>(args: SelectSubset<T, UserPresenceUpdateArgs<ExtArgs>>): Prisma__UserPresenceClient<$Result.GetResult<Prisma.$UserPresencePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserPresences.
     * @param {UserPresenceDeleteManyArgs} args - Arguments to filter UserPresences to delete.
     * @example
     * // Delete a few UserPresences
     * const { count } = await prisma.userPresence.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserPresenceDeleteManyArgs>(args?: SelectSubset<T, UserPresenceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserPresences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserPresenceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserPresences
     * const userPresence = await prisma.userPresence.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserPresenceUpdateManyArgs>(args: SelectSubset<T, UserPresenceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one UserPresence.
     * @param {UserPresenceUpsertArgs} args - Arguments to update or create a UserPresence.
     * @example
     * // Update or create a UserPresence
     * const userPresence = await prisma.userPresence.upsert({
     *   create: {
     *     // ... data to create a UserPresence
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserPresence we want to update
     *   }
     * })
     */
    upsert<T extends UserPresenceUpsertArgs>(args: SelectSubset<T, UserPresenceUpsertArgs<ExtArgs>>): Prisma__UserPresenceClient<$Result.GetResult<Prisma.$UserPresencePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserPresences that matches the filter.
     * @param {UserPresenceFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const userPresence = await prisma.userPresence.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: UserPresenceFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a UserPresence.
     * @param {UserPresenceAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const userPresence = await prisma.userPresence.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: UserPresenceAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of UserPresences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserPresenceCountArgs} args - Arguments to filter UserPresences to count.
     * @example
     * // Count the number of UserPresences
     * const count = await prisma.userPresence.count({
     *   where: {
     *     // ... the filter for the UserPresences we want to count
     *   }
     * })
    **/
    count<T extends UserPresenceCountArgs>(
      args?: Subset<T, UserPresenceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserPresenceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserPresence.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserPresenceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserPresenceAggregateArgs>(args: Subset<T, UserPresenceAggregateArgs>): Prisma.PrismaPromise<GetUserPresenceAggregateType<T>>

    /**
     * Group by UserPresence.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserPresenceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserPresenceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserPresenceGroupByArgs['orderBy'] }
        : { orderBy?: UserPresenceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserPresenceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserPresenceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserPresence model
   */
  readonly fields: UserPresenceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserPresence.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserPresenceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserPresence model
   */
  interface UserPresenceFieldRefs {
    readonly id: FieldRef<"UserPresence", 'String'>
    readonly userId: FieldRef<"UserPresence", 'String'>
    readonly isOnline: FieldRef<"UserPresence", 'Boolean'>
    readonly lastSeen: FieldRef<"UserPresence", 'DateTime'>
    readonly status: FieldRef<"UserPresence", 'String'>
    readonly currentDevice: FieldRef<"UserPresence", 'String'>
    readonly updatedAt: FieldRef<"UserPresence", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserPresence findUnique
   */
  export type UserPresenceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPresence
     */
    select?: UserPresenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserPresence
     */
    omit?: UserPresenceOmit<ExtArgs> | null
    /**
     * Filter, which UserPresence to fetch.
     */
    where: UserPresenceWhereUniqueInput
  }

  /**
   * UserPresence findUniqueOrThrow
   */
  export type UserPresenceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPresence
     */
    select?: UserPresenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserPresence
     */
    omit?: UserPresenceOmit<ExtArgs> | null
    /**
     * Filter, which UserPresence to fetch.
     */
    where: UserPresenceWhereUniqueInput
  }

  /**
   * UserPresence findFirst
   */
  export type UserPresenceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPresence
     */
    select?: UserPresenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserPresence
     */
    omit?: UserPresenceOmit<ExtArgs> | null
    /**
     * Filter, which UserPresence to fetch.
     */
    where?: UserPresenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserPresences to fetch.
     */
    orderBy?: UserPresenceOrderByWithRelationInput | UserPresenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserPresences.
     */
    cursor?: UserPresenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserPresences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserPresences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserPresences.
     */
    distinct?: UserPresenceScalarFieldEnum | UserPresenceScalarFieldEnum[]
  }

  /**
   * UserPresence findFirstOrThrow
   */
  export type UserPresenceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPresence
     */
    select?: UserPresenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserPresence
     */
    omit?: UserPresenceOmit<ExtArgs> | null
    /**
     * Filter, which UserPresence to fetch.
     */
    where?: UserPresenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserPresences to fetch.
     */
    orderBy?: UserPresenceOrderByWithRelationInput | UserPresenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserPresences.
     */
    cursor?: UserPresenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserPresences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserPresences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserPresences.
     */
    distinct?: UserPresenceScalarFieldEnum | UserPresenceScalarFieldEnum[]
  }

  /**
   * UserPresence findMany
   */
  export type UserPresenceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPresence
     */
    select?: UserPresenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserPresence
     */
    omit?: UserPresenceOmit<ExtArgs> | null
    /**
     * Filter, which UserPresences to fetch.
     */
    where?: UserPresenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserPresences to fetch.
     */
    orderBy?: UserPresenceOrderByWithRelationInput | UserPresenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserPresences.
     */
    cursor?: UserPresenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserPresences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserPresences.
     */
    skip?: number
    distinct?: UserPresenceScalarFieldEnum | UserPresenceScalarFieldEnum[]
  }

  /**
   * UserPresence create
   */
  export type UserPresenceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPresence
     */
    select?: UserPresenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserPresence
     */
    omit?: UserPresenceOmit<ExtArgs> | null
    /**
     * The data needed to create a UserPresence.
     */
    data: XOR<UserPresenceCreateInput, UserPresenceUncheckedCreateInput>
  }

  /**
   * UserPresence createMany
   */
  export type UserPresenceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserPresences.
     */
    data: UserPresenceCreateManyInput | UserPresenceCreateManyInput[]
  }

  /**
   * UserPresence update
   */
  export type UserPresenceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPresence
     */
    select?: UserPresenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserPresence
     */
    omit?: UserPresenceOmit<ExtArgs> | null
    /**
     * The data needed to update a UserPresence.
     */
    data: XOR<UserPresenceUpdateInput, UserPresenceUncheckedUpdateInput>
    /**
     * Choose, which UserPresence to update.
     */
    where: UserPresenceWhereUniqueInput
  }

  /**
   * UserPresence updateMany
   */
  export type UserPresenceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserPresences.
     */
    data: XOR<UserPresenceUpdateManyMutationInput, UserPresenceUncheckedUpdateManyInput>
    /**
     * Filter which UserPresences to update
     */
    where?: UserPresenceWhereInput
    /**
     * Limit how many UserPresences to update.
     */
    limit?: number
  }

  /**
   * UserPresence upsert
   */
  export type UserPresenceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPresence
     */
    select?: UserPresenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserPresence
     */
    omit?: UserPresenceOmit<ExtArgs> | null
    /**
     * The filter to search for the UserPresence to update in case it exists.
     */
    where: UserPresenceWhereUniqueInput
    /**
     * In case the UserPresence found by the `where` argument doesn't exist, create a new UserPresence with this data.
     */
    create: XOR<UserPresenceCreateInput, UserPresenceUncheckedCreateInput>
    /**
     * In case the UserPresence was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserPresenceUpdateInput, UserPresenceUncheckedUpdateInput>
  }

  /**
   * UserPresence delete
   */
  export type UserPresenceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPresence
     */
    select?: UserPresenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserPresence
     */
    omit?: UserPresenceOmit<ExtArgs> | null
    /**
     * Filter which UserPresence to delete.
     */
    where: UserPresenceWhereUniqueInput
  }

  /**
   * UserPresence deleteMany
   */
  export type UserPresenceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserPresences to delete
     */
    where?: UserPresenceWhereInput
    /**
     * Limit how many UserPresences to delete.
     */
    limit?: number
  }

  /**
   * UserPresence findRaw
   */
  export type UserPresenceFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * UserPresence aggregateRaw
   */
  export type UserPresenceAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * UserPresence without action
   */
  export type UserPresenceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPresence
     */
    select?: UserPresenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserPresence
     */
    omit?: UserPresenceOmit<ExtArgs> | null
  }


  /**
   * Model NotificationSettings
   */

  export type AggregateNotificationSettings = {
    _count: NotificationSettingsCountAggregateOutputType | null
    _min: NotificationSettingsMinAggregateOutputType | null
    _max: NotificationSettingsMaxAggregateOutputType | null
  }

  export type NotificationSettingsMinAggregateOutputType = {
    id: string | null
    userId: string | null
    pushNotifications: boolean | null
    emailNotifications: boolean | null
    friendRequests: boolean | null
    messages: boolean | null
    orderUpdates: boolean | null
    pantryAlerts: boolean | null
    recipeShares: boolean | null
    marketplaceUpdates: boolean | null
    systemAnnouncements: boolean | null
    emailFrequency: string | null
    quietHoursStart: string | null
    quietHoursEnd: string | null
    timezone: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NotificationSettingsMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    pushNotifications: boolean | null
    emailNotifications: boolean | null
    friendRequests: boolean | null
    messages: boolean | null
    orderUpdates: boolean | null
    pantryAlerts: boolean | null
    recipeShares: boolean | null
    marketplaceUpdates: boolean | null
    systemAnnouncements: boolean | null
    emailFrequency: string | null
    quietHoursStart: string | null
    quietHoursEnd: string | null
    timezone: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NotificationSettingsCountAggregateOutputType = {
    id: number
    userId: number
    pushNotifications: number
    emailNotifications: number
    friendRequests: number
    messages: number
    orderUpdates: number
    pantryAlerts: number
    recipeShares: number
    marketplaceUpdates: number
    systemAnnouncements: number
    pushTokens: number
    emailFrequency: number
    quietHoursStart: number
    quietHoursEnd: number
    timezone: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type NotificationSettingsMinAggregateInputType = {
    id?: true
    userId?: true
    pushNotifications?: true
    emailNotifications?: true
    friendRequests?: true
    messages?: true
    orderUpdates?: true
    pantryAlerts?: true
    recipeShares?: true
    marketplaceUpdates?: true
    systemAnnouncements?: true
    emailFrequency?: true
    quietHoursStart?: true
    quietHoursEnd?: true
    timezone?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NotificationSettingsMaxAggregateInputType = {
    id?: true
    userId?: true
    pushNotifications?: true
    emailNotifications?: true
    friendRequests?: true
    messages?: true
    orderUpdates?: true
    pantryAlerts?: true
    recipeShares?: true
    marketplaceUpdates?: true
    systemAnnouncements?: true
    emailFrequency?: true
    quietHoursStart?: true
    quietHoursEnd?: true
    timezone?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NotificationSettingsCountAggregateInputType = {
    id?: true
    userId?: true
    pushNotifications?: true
    emailNotifications?: true
    friendRequests?: true
    messages?: true
    orderUpdates?: true
    pantryAlerts?: true
    recipeShares?: true
    marketplaceUpdates?: true
    systemAnnouncements?: true
    pushTokens?: true
    emailFrequency?: true
    quietHoursStart?: true
    quietHoursEnd?: true
    timezone?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type NotificationSettingsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NotificationSettings to aggregate.
     */
    where?: NotificationSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NotificationSettings to fetch.
     */
    orderBy?: NotificationSettingsOrderByWithRelationInput | NotificationSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NotificationSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NotificationSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NotificationSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned NotificationSettings
    **/
    _count?: true | NotificationSettingsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificationSettingsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificationSettingsMaxAggregateInputType
  }

  export type GetNotificationSettingsAggregateType<T extends NotificationSettingsAggregateArgs> = {
        [P in keyof T & keyof AggregateNotificationSettings]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotificationSettings[P]>
      : GetScalarType<T[P], AggregateNotificationSettings[P]>
  }




  export type NotificationSettingsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationSettingsWhereInput
    orderBy?: NotificationSettingsOrderByWithAggregationInput | NotificationSettingsOrderByWithAggregationInput[]
    by: NotificationSettingsScalarFieldEnum[] | NotificationSettingsScalarFieldEnum
    having?: NotificationSettingsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificationSettingsCountAggregateInputType | true
    _min?: NotificationSettingsMinAggregateInputType
    _max?: NotificationSettingsMaxAggregateInputType
  }

  export type NotificationSettingsGroupByOutputType = {
    id: string
    userId: string
    pushNotifications: boolean
    emailNotifications: boolean
    friendRequests: boolean
    messages: boolean
    orderUpdates: boolean
    pantryAlerts: boolean
    recipeShares: boolean
    marketplaceUpdates: boolean
    systemAnnouncements: boolean
    pushTokens: string[]
    emailFrequency: string
    quietHoursStart: string | null
    quietHoursEnd: string | null
    timezone: string
    createdAt: Date
    updatedAt: Date
    _count: NotificationSettingsCountAggregateOutputType | null
    _min: NotificationSettingsMinAggregateOutputType | null
    _max: NotificationSettingsMaxAggregateOutputType | null
  }

  type GetNotificationSettingsGroupByPayload<T extends NotificationSettingsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotificationSettingsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotificationSettingsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotificationSettingsGroupByOutputType[P]>
            : GetScalarType<T[P], NotificationSettingsGroupByOutputType[P]>
        }
      >
    >


  export type NotificationSettingsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    pushNotifications?: boolean
    emailNotifications?: boolean
    friendRequests?: boolean
    messages?: boolean
    orderUpdates?: boolean
    pantryAlerts?: boolean
    recipeShares?: boolean
    marketplaceUpdates?: boolean
    systemAnnouncements?: boolean
    pushTokens?: boolean
    emailFrequency?: boolean
    quietHoursStart?: boolean
    quietHoursEnd?: boolean
    timezone?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["notificationSettings"]>



  export type NotificationSettingsSelectScalar = {
    id?: boolean
    userId?: boolean
    pushNotifications?: boolean
    emailNotifications?: boolean
    friendRequests?: boolean
    messages?: boolean
    orderUpdates?: boolean
    pantryAlerts?: boolean
    recipeShares?: boolean
    marketplaceUpdates?: boolean
    systemAnnouncements?: boolean
    pushTokens?: boolean
    emailFrequency?: boolean
    quietHoursStart?: boolean
    quietHoursEnd?: boolean
    timezone?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type NotificationSettingsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "pushNotifications" | "emailNotifications" | "friendRequests" | "messages" | "orderUpdates" | "pantryAlerts" | "recipeShares" | "marketplaceUpdates" | "systemAnnouncements" | "pushTokens" | "emailFrequency" | "quietHoursStart" | "quietHoursEnd" | "timezone" | "createdAt" | "updatedAt", ExtArgs["result"]["notificationSettings"]>

  export type $NotificationSettingsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "NotificationSettings"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      pushNotifications: boolean
      emailNotifications: boolean
      friendRequests: boolean
      messages: boolean
      orderUpdates: boolean
      pantryAlerts: boolean
      recipeShares: boolean
      marketplaceUpdates: boolean
      systemAnnouncements: boolean
      pushTokens: string[]
      emailFrequency: string
      quietHoursStart: string | null
      quietHoursEnd: string | null
      timezone: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["notificationSettings"]>
    composites: {}
  }

  type NotificationSettingsGetPayload<S extends boolean | null | undefined | NotificationSettingsDefaultArgs> = $Result.GetResult<Prisma.$NotificationSettingsPayload, S>

  type NotificationSettingsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NotificationSettingsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NotificationSettingsCountAggregateInputType | true
    }

  export interface NotificationSettingsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['NotificationSettings'], meta: { name: 'NotificationSettings' } }
    /**
     * Find zero or one NotificationSettings that matches the filter.
     * @param {NotificationSettingsFindUniqueArgs} args - Arguments to find a NotificationSettings
     * @example
     * // Get one NotificationSettings
     * const notificationSettings = await prisma.notificationSettings.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NotificationSettingsFindUniqueArgs>(args: SelectSubset<T, NotificationSettingsFindUniqueArgs<ExtArgs>>): Prisma__NotificationSettingsClient<$Result.GetResult<Prisma.$NotificationSettingsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one NotificationSettings that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NotificationSettingsFindUniqueOrThrowArgs} args - Arguments to find a NotificationSettings
     * @example
     * // Get one NotificationSettings
     * const notificationSettings = await prisma.notificationSettings.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NotificationSettingsFindUniqueOrThrowArgs>(args: SelectSubset<T, NotificationSettingsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NotificationSettingsClient<$Result.GetResult<Prisma.$NotificationSettingsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NotificationSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationSettingsFindFirstArgs} args - Arguments to find a NotificationSettings
     * @example
     * // Get one NotificationSettings
     * const notificationSettings = await prisma.notificationSettings.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NotificationSettingsFindFirstArgs>(args?: SelectSubset<T, NotificationSettingsFindFirstArgs<ExtArgs>>): Prisma__NotificationSettingsClient<$Result.GetResult<Prisma.$NotificationSettingsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NotificationSettings that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationSettingsFindFirstOrThrowArgs} args - Arguments to find a NotificationSettings
     * @example
     * // Get one NotificationSettings
     * const notificationSettings = await prisma.notificationSettings.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NotificationSettingsFindFirstOrThrowArgs>(args?: SelectSubset<T, NotificationSettingsFindFirstOrThrowArgs<ExtArgs>>): Prisma__NotificationSettingsClient<$Result.GetResult<Prisma.$NotificationSettingsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more NotificationSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationSettingsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all NotificationSettings
     * const notificationSettings = await prisma.notificationSettings.findMany()
     * 
     * // Get first 10 NotificationSettings
     * const notificationSettings = await prisma.notificationSettings.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const notificationSettingsWithIdOnly = await prisma.notificationSettings.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NotificationSettingsFindManyArgs>(args?: SelectSubset<T, NotificationSettingsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationSettingsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a NotificationSettings.
     * @param {NotificationSettingsCreateArgs} args - Arguments to create a NotificationSettings.
     * @example
     * // Create one NotificationSettings
     * const NotificationSettings = await prisma.notificationSettings.create({
     *   data: {
     *     // ... data to create a NotificationSettings
     *   }
     * })
     * 
     */
    create<T extends NotificationSettingsCreateArgs>(args: SelectSubset<T, NotificationSettingsCreateArgs<ExtArgs>>): Prisma__NotificationSettingsClient<$Result.GetResult<Prisma.$NotificationSettingsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many NotificationSettings.
     * @param {NotificationSettingsCreateManyArgs} args - Arguments to create many NotificationSettings.
     * @example
     * // Create many NotificationSettings
     * const notificationSettings = await prisma.notificationSettings.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NotificationSettingsCreateManyArgs>(args?: SelectSubset<T, NotificationSettingsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a NotificationSettings.
     * @param {NotificationSettingsDeleteArgs} args - Arguments to delete one NotificationSettings.
     * @example
     * // Delete one NotificationSettings
     * const NotificationSettings = await prisma.notificationSettings.delete({
     *   where: {
     *     // ... filter to delete one NotificationSettings
     *   }
     * })
     * 
     */
    delete<T extends NotificationSettingsDeleteArgs>(args: SelectSubset<T, NotificationSettingsDeleteArgs<ExtArgs>>): Prisma__NotificationSettingsClient<$Result.GetResult<Prisma.$NotificationSettingsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one NotificationSettings.
     * @param {NotificationSettingsUpdateArgs} args - Arguments to update one NotificationSettings.
     * @example
     * // Update one NotificationSettings
     * const notificationSettings = await prisma.notificationSettings.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NotificationSettingsUpdateArgs>(args: SelectSubset<T, NotificationSettingsUpdateArgs<ExtArgs>>): Prisma__NotificationSettingsClient<$Result.GetResult<Prisma.$NotificationSettingsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more NotificationSettings.
     * @param {NotificationSettingsDeleteManyArgs} args - Arguments to filter NotificationSettings to delete.
     * @example
     * // Delete a few NotificationSettings
     * const { count } = await prisma.notificationSettings.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NotificationSettingsDeleteManyArgs>(args?: SelectSubset<T, NotificationSettingsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NotificationSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationSettingsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many NotificationSettings
     * const notificationSettings = await prisma.notificationSettings.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NotificationSettingsUpdateManyArgs>(args: SelectSubset<T, NotificationSettingsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one NotificationSettings.
     * @param {NotificationSettingsUpsertArgs} args - Arguments to update or create a NotificationSettings.
     * @example
     * // Update or create a NotificationSettings
     * const notificationSettings = await prisma.notificationSettings.upsert({
     *   create: {
     *     // ... data to create a NotificationSettings
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the NotificationSettings we want to update
     *   }
     * })
     */
    upsert<T extends NotificationSettingsUpsertArgs>(args: SelectSubset<T, NotificationSettingsUpsertArgs<ExtArgs>>): Prisma__NotificationSettingsClient<$Result.GetResult<Prisma.$NotificationSettingsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more NotificationSettings that matches the filter.
     * @param {NotificationSettingsFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const notificationSettings = await prisma.notificationSettings.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: NotificationSettingsFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a NotificationSettings.
     * @param {NotificationSettingsAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const notificationSettings = await prisma.notificationSettings.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: NotificationSettingsAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of NotificationSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationSettingsCountArgs} args - Arguments to filter NotificationSettings to count.
     * @example
     * // Count the number of NotificationSettings
     * const count = await prisma.notificationSettings.count({
     *   where: {
     *     // ... the filter for the NotificationSettings we want to count
     *   }
     * })
    **/
    count<T extends NotificationSettingsCountArgs>(
      args?: Subset<T, NotificationSettingsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificationSettingsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a NotificationSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationSettingsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NotificationSettingsAggregateArgs>(args: Subset<T, NotificationSettingsAggregateArgs>): Prisma.PrismaPromise<GetNotificationSettingsAggregateType<T>>

    /**
     * Group by NotificationSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationSettingsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NotificationSettingsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NotificationSettingsGroupByArgs['orderBy'] }
        : { orderBy?: NotificationSettingsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NotificationSettingsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationSettingsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the NotificationSettings model
   */
  readonly fields: NotificationSettingsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for NotificationSettings.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NotificationSettingsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the NotificationSettings model
   */
  interface NotificationSettingsFieldRefs {
    readonly id: FieldRef<"NotificationSettings", 'String'>
    readonly userId: FieldRef<"NotificationSettings", 'String'>
    readonly pushNotifications: FieldRef<"NotificationSettings", 'Boolean'>
    readonly emailNotifications: FieldRef<"NotificationSettings", 'Boolean'>
    readonly friendRequests: FieldRef<"NotificationSettings", 'Boolean'>
    readonly messages: FieldRef<"NotificationSettings", 'Boolean'>
    readonly orderUpdates: FieldRef<"NotificationSettings", 'Boolean'>
    readonly pantryAlerts: FieldRef<"NotificationSettings", 'Boolean'>
    readonly recipeShares: FieldRef<"NotificationSettings", 'Boolean'>
    readonly marketplaceUpdates: FieldRef<"NotificationSettings", 'Boolean'>
    readonly systemAnnouncements: FieldRef<"NotificationSettings", 'Boolean'>
    readonly pushTokens: FieldRef<"NotificationSettings", 'String[]'>
    readonly emailFrequency: FieldRef<"NotificationSettings", 'String'>
    readonly quietHoursStart: FieldRef<"NotificationSettings", 'String'>
    readonly quietHoursEnd: FieldRef<"NotificationSettings", 'String'>
    readonly timezone: FieldRef<"NotificationSettings", 'String'>
    readonly createdAt: FieldRef<"NotificationSettings", 'DateTime'>
    readonly updatedAt: FieldRef<"NotificationSettings", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * NotificationSettings findUnique
   */
  export type NotificationSettingsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationSettings
     */
    select?: NotificationSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationSettings
     */
    omit?: NotificationSettingsOmit<ExtArgs> | null
    /**
     * Filter, which NotificationSettings to fetch.
     */
    where: NotificationSettingsWhereUniqueInput
  }

  /**
   * NotificationSettings findUniqueOrThrow
   */
  export type NotificationSettingsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationSettings
     */
    select?: NotificationSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationSettings
     */
    omit?: NotificationSettingsOmit<ExtArgs> | null
    /**
     * Filter, which NotificationSettings to fetch.
     */
    where: NotificationSettingsWhereUniqueInput
  }

  /**
   * NotificationSettings findFirst
   */
  export type NotificationSettingsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationSettings
     */
    select?: NotificationSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationSettings
     */
    omit?: NotificationSettingsOmit<ExtArgs> | null
    /**
     * Filter, which NotificationSettings to fetch.
     */
    where?: NotificationSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NotificationSettings to fetch.
     */
    orderBy?: NotificationSettingsOrderByWithRelationInput | NotificationSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NotificationSettings.
     */
    cursor?: NotificationSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NotificationSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NotificationSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NotificationSettings.
     */
    distinct?: NotificationSettingsScalarFieldEnum | NotificationSettingsScalarFieldEnum[]
  }

  /**
   * NotificationSettings findFirstOrThrow
   */
  export type NotificationSettingsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationSettings
     */
    select?: NotificationSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationSettings
     */
    omit?: NotificationSettingsOmit<ExtArgs> | null
    /**
     * Filter, which NotificationSettings to fetch.
     */
    where?: NotificationSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NotificationSettings to fetch.
     */
    orderBy?: NotificationSettingsOrderByWithRelationInput | NotificationSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NotificationSettings.
     */
    cursor?: NotificationSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NotificationSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NotificationSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NotificationSettings.
     */
    distinct?: NotificationSettingsScalarFieldEnum | NotificationSettingsScalarFieldEnum[]
  }

  /**
   * NotificationSettings findMany
   */
  export type NotificationSettingsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationSettings
     */
    select?: NotificationSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationSettings
     */
    omit?: NotificationSettingsOmit<ExtArgs> | null
    /**
     * Filter, which NotificationSettings to fetch.
     */
    where?: NotificationSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NotificationSettings to fetch.
     */
    orderBy?: NotificationSettingsOrderByWithRelationInput | NotificationSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing NotificationSettings.
     */
    cursor?: NotificationSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NotificationSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NotificationSettings.
     */
    skip?: number
    distinct?: NotificationSettingsScalarFieldEnum | NotificationSettingsScalarFieldEnum[]
  }

  /**
   * NotificationSettings create
   */
  export type NotificationSettingsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationSettings
     */
    select?: NotificationSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationSettings
     */
    omit?: NotificationSettingsOmit<ExtArgs> | null
    /**
     * The data needed to create a NotificationSettings.
     */
    data: XOR<NotificationSettingsCreateInput, NotificationSettingsUncheckedCreateInput>
  }

  /**
   * NotificationSettings createMany
   */
  export type NotificationSettingsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many NotificationSettings.
     */
    data: NotificationSettingsCreateManyInput | NotificationSettingsCreateManyInput[]
  }

  /**
   * NotificationSettings update
   */
  export type NotificationSettingsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationSettings
     */
    select?: NotificationSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationSettings
     */
    omit?: NotificationSettingsOmit<ExtArgs> | null
    /**
     * The data needed to update a NotificationSettings.
     */
    data: XOR<NotificationSettingsUpdateInput, NotificationSettingsUncheckedUpdateInput>
    /**
     * Choose, which NotificationSettings to update.
     */
    where: NotificationSettingsWhereUniqueInput
  }

  /**
   * NotificationSettings updateMany
   */
  export type NotificationSettingsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update NotificationSettings.
     */
    data: XOR<NotificationSettingsUpdateManyMutationInput, NotificationSettingsUncheckedUpdateManyInput>
    /**
     * Filter which NotificationSettings to update
     */
    where?: NotificationSettingsWhereInput
    /**
     * Limit how many NotificationSettings to update.
     */
    limit?: number
  }

  /**
   * NotificationSettings upsert
   */
  export type NotificationSettingsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationSettings
     */
    select?: NotificationSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationSettings
     */
    omit?: NotificationSettingsOmit<ExtArgs> | null
    /**
     * The filter to search for the NotificationSettings to update in case it exists.
     */
    where: NotificationSettingsWhereUniqueInput
    /**
     * In case the NotificationSettings found by the `where` argument doesn't exist, create a new NotificationSettings with this data.
     */
    create: XOR<NotificationSettingsCreateInput, NotificationSettingsUncheckedCreateInput>
    /**
     * In case the NotificationSettings was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NotificationSettingsUpdateInput, NotificationSettingsUncheckedUpdateInput>
  }

  /**
   * NotificationSettings delete
   */
  export type NotificationSettingsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationSettings
     */
    select?: NotificationSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationSettings
     */
    omit?: NotificationSettingsOmit<ExtArgs> | null
    /**
     * Filter which NotificationSettings to delete.
     */
    where: NotificationSettingsWhereUniqueInput
  }

  /**
   * NotificationSettings deleteMany
   */
  export type NotificationSettingsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NotificationSettings to delete
     */
    where?: NotificationSettingsWhereInput
    /**
     * Limit how many NotificationSettings to delete.
     */
    limit?: number
  }

  /**
   * NotificationSettings findRaw
   */
  export type NotificationSettingsFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * NotificationSettings aggregateRaw
   */
  export type NotificationSettingsAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * NotificationSettings without action
   */
  export type NotificationSettingsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationSettings
     */
    select?: NotificationSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationSettings
     */
    omit?: NotificationSettingsOmit<ExtArgs> | null
  }


  /**
   * Model TypingIndicator
   */

  export type AggregateTypingIndicator = {
    _count: TypingIndicatorCountAggregateOutputType | null
    _min: TypingIndicatorMinAggregateOutputType | null
    _max: TypingIndicatorMaxAggregateOutputType | null
  }

  export type TypingIndicatorMinAggregateOutputType = {
    id: string | null
    conversationId: string | null
    userId: string | null
    isTyping: boolean | null
    lastTyping: Date | null
  }

  export type TypingIndicatorMaxAggregateOutputType = {
    id: string | null
    conversationId: string | null
    userId: string | null
    isTyping: boolean | null
    lastTyping: Date | null
  }

  export type TypingIndicatorCountAggregateOutputType = {
    id: number
    conversationId: number
    userId: number
    isTyping: number
    lastTyping: number
    _all: number
  }


  export type TypingIndicatorMinAggregateInputType = {
    id?: true
    conversationId?: true
    userId?: true
    isTyping?: true
    lastTyping?: true
  }

  export type TypingIndicatorMaxAggregateInputType = {
    id?: true
    conversationId?: true
    userId?: true
    isTyping?: true
    lastTyping?: true
  }

  export type TypingIndicatorCountAggregateInputType = {
    id?: true
    conversationId?: true
    userId?: true
    isTyping?: true
    lastTyping?: true
    _all?: true
  }

  export type TypingIndicatorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TypingIndicator to aggregate.
     */
    where?: TypingIndicatorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TypingIndicators to fetch.
     */
    orderBy?: TypingIndicatorOrderByWithRelationInput | TypingIndicatorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TypingIndicatorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TypingIndicators from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TypingIndicators.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TypingIndicators
    **/
    _count?: true | TypingIndicatorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TypingIndicatorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TypingIndicatorMaxAggregateInputType
  }

  export type GetTypingIndicatorAggregateType<T extends TypingIndicatorAggregateArgs> = {
        [P in keyof T & keyof AggregateTypingIndicator]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTypingIndicator[P]>
      : GetScalarType<T[P], AggregateTypingIndicator[P]>
  }




  export type TypingIndicatorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TypingIndicatorWhereInput
    orderBy?: TypingIndicatorOrderByWithAggregationInput | TypingIndicatorOrderByWithAggregationInput[]
    by: TypingIndicatorScalarFieldEnum[] | TypingIndicatorScalarFieldEnum
    having?: TypingIndicatorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TypingIndicatorCountAggregateInputType | true
    _min?: TypingIndicatorMinAggregateInputType
    _max?: TypingIndicatorMaxAggregateInputType
  }

  export type TypingIndicatorGroupByOutputType = {
    id: string
    conversationId: string
    userId: string
    isTyping: boolean
    lastTyping: Date
    _count: TypingIndicatorCountAggregateOutputType | null
    _min: TypingIndicatorMinAggregateOutputType | null
    _max: TypingIndicatorMaxAggregateOutputType | null
  }

  type GetTypingIndicatorGroupByPayload<T extends TypingIndicatorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TypingIndicatorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TypingIndicatorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TypingIndicatorGroupByOutputType[P]>
            : GetScalarType<T[P], TypingIndicatorGroupByOutputType[P]>
        }
      >
    >


  export type TypingIndicatorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    conversationId?: boolean
    userId?: boolean
    isTyping?: boolean
    lastTyping?: boolean
  }, ExtArgs["result"]["typingIndicator"]>



  export type TypingIndicatorSelectScalar = {
    id?: boolean
    conversationId?: boolean
    userId?: boolean
    isTyping?: boolean
    lastTyping?: boolean
  }

  export type TypingIndicatorOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "conversationId" | "userId" | "isTyping" | "lastTyping", ExtArgs["result"]["typingIndicator"]>

  export type $TypingIndicatorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TypingIndicator"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      conversationId: string
      userId: string
      isTyping: boolean
      lastTyping: Date
    }, ExtArgs["result"]["typingIndicator"]>
    composites: {}
  }

  type TypingIndicatorGetPayload<S extends boolean | null | undefined | TypingIndicatorDefaultArgs> = $Result.GetResult<Prisma.$TypingIndicatorPayload, S>

  type TypingIndicatorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TypingIndicatorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TypingIndicatorCountAggregateInputType | true
    }

  export interface TypingIndicatorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TypingIndicator'], meta: { name: 'TypingIndicator' } }
    /**
     * Find zero or one TypingIndicator that matches the filter.
     * @param {TypingIndicatorFindUniqueArgs} args - Arguments to find a TypingIndicator
     * @example
     * // Get one TypingIndicator
     * const typingIndicator = await prisma.typingIndicator.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TypingIndicatorFindUniqueArgs>(args: SelectSubset<T, TypingIndicatorFindUniqueArgs<ExtArgs>>): Prisma__TypingIndicatorClient<$Result.GetResult<Prisma.$TypingIndicatorPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TypingIndicator that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TypingIndicatorFindUniqueOrThrowArgs} args - Arguments to find a TypingIndicator
     * @example
     * // Get one TypingIndicator
     * const typingIndicator = await prisma.typingIndicator.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TypingIndicatorFindUniqueOrThrowArgs>(args: SelectSubset<T, TypingIndicatorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TypingIndicatorClient<$Result.GetResult<Prisma.$TypingIndicatorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TypingIndicator that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TypingIndicatorFindFirstArgs} args - Arguments to find a TypingIndicator
     * @example
     * // Get one TypingIndicator
     * const typingIndicator = await prisma.typingIndicator.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TypingIndicatorFindFirstArgs>(args?: SelectSubset<T, TypingIndicatorFindFirstArgs<ExtArgs>>): Prisma__TypingIndicatorClient<$Result.GetResult<Prisma.$TypingIndicatorPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TypingIndicator that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TypingIndicatorFindFirstOrThrowArgs} args - Arguments to find a TypingIndicator
     * @example
     * // Get one TypingIndicator
     * const typingIndicator = await prisma.typingIndicator.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TypingIndicatorFindFirstOrThrowArgs>(args?: SelectSubset<T, TypingIndicatorFindFirstOrThrowArgs<ExtArgs>>): Prisma__TypingIndicatorClient<$Result.GetResult<Prisma.$TypingIndicatorPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TypingIndicators that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TypingIndicatorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TypingIndicators
     * const typingIndicators = await prisma.typingIndicator.findMany()
     * 
     * // Get first 10 TypingIndicators
     * const typingIndicators = await prisma.typingIndicator.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const typingIndicatorWithIdOnly = await prisma.typingIndicator.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TypingIndicatorFindManyArgs>(args?: SelectSubset<T, TypingIndicatorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TypingIndicatorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TypingIndicator.
     * @param {TypingIndicatorCreateArgs} args - Arguments to create a TypingIndicator.
     * @example
     * // Create one TypingIndicator
     * const TypingIndicator = await prisma.typingIndicator.create({
     *   data: {
     *     // ... data to create a TypingIndicator
     *   }
     * })
     * 
     */
    create<T extends TypingIndicatorCreateArgs>(args: SelectSubset<T, TypingIndicatorCreateArgs<ExtArgs>>): Prisma__TypingIndicatorClient<$Result.GetResult<Prisma.$TypingIndicatorPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TypingIndicators.
     * @param {TypingIndicatorCreateManyArgs} args - Arguments to create many TypingIndicators.
     * @example
     * // Create many TypingIndicators
     * const typingIndicator = await prisma.typingIndicator.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TypingIndicatorCreateManyArgs>(args?: SelectSubset<T, TypingIndicatorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a TypingIndicator.
     * @param {TypingIndicatorDeleteArgs} args - Arguments to delete one TypingIndicator.
     * @example
     * // Delete one TypingIndicator
     * const TypingIndicator = await prisma.typingIndicator.delete({
     *   where: {
     *     // ... filter to delete one TypingIndicator
     *   }
     * })
     * 
     */
    delete<T extends TypingIndicatorDeleteArgs>(args: SelectSubset<T, TypingIndicatorDeleteArgs<ExtArgs>>): Prisma__TypingIndicatorClient<$Result.GetResult<Prisma.$TypingIndicatorPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TypingIndicator.
     * @param {TypingIndicatorUpdateArgs} args - Arguments to update one TypingIndicator.
     * @example
     * // Update one TypingIndicator
     * const typingIndicator = await prisma.typingIndicator.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TypingIndicatorUpdateArgs>(args: SelectSubset<T, TypingIndicatorUpdateArgs<ExtArgs>>): Prisma__TypingIndicatorClient<$Result.GetResult<Prisma.$TypingIndicatorPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TypingIndicators.
     * @param {TypingIndicatorDeleteManyArgs} args - Arguments to filter TypingIndicators to delete.
     * @example
     * // Delete a few TypingIndicators
     * const { count } = await prisma.typingIndicator.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TypingIndicatorDeleteManyArgs>(args?: SelectSubset<T, TypingIndicatorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TypingIndicators.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TypingIndicatorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TypingIndicators
     * const typingIndicator = await prisma.typingIndicator.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TypingIndicatorUpdateManyArgs>(args: SelectSubset<T, TypingIndicatorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one TypingIndicator.
     * @param {TypingIndicatorUpsertArgs} args - Arguments to update or create a TypingIndicator.
     * @example
     * // Update or create a TypingIndicator
     * const typingIndicator = await prisma.typingIndicator.upsert({
     *   create: {
     *     // ... data to create a TypingIndicator
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TypingIndicator we want to update
     *   }
     * })
     */
    upsert<T extends TypingIndicatorUpsertArgs>(args: SelectSubset<T, TypingIndicatorUpsertArgs<ExtArgs>>): Prisma__TypingIndicatorClient<$Result.GetResult<Prisma.$TypingIndicatorPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TypingIndicators that matches the filter.
     * @param {TypingIndicatorFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const typingIndicator = await prisma.typingIndicator.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: TypingIndicatorFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a TypingIndicator.
     * @param {TypingIndicatorAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const typingIndicator = await prisma.typingIndicator.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: TypingIndicatorAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of TypingIndicators.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TypingIndicatorCountArgs} args - Arguments to filter TypingIndicators to count.
     * @example
     * // Count the number of TypingIndicators
     * const count = await prisma.typingIndicator.count({
     *   where: {
     *     // ... the filter for the TypingIndicators we want to count
     *   }
     * })
    **/
    count<T extends TypingIndicatorCountArgs>(
      args?: Subset<T, TypingIndicatorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TypingIndicatorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TypingIndicator.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TypingIndicatorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TypingIndicatorAggregateArgs>(args: Subset<T, TypingIndicatorAggregateArgs>): Prisma.PrismaPromise<GetTypingIndicatorAggregateType<T>>

    /**
     * Group by TypingIndicator.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TypingIndicatorGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TypingIndicatorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TypingIndicatorGroupByArgs['orderBy'] }
        : { orderBy?: TypingIndicatorGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TypingIndicatorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTypingIndicatorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TypingIndicator model
   */
  readonly fields: TypingIndicatorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TypingIndicator.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TypingIndicatorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TypingIndicator model
   */
  interface TypingIndicatorFieldRefs {
    readonly id: FieldRef<"TypingIndicator", 'String'>
    readonly conversationId: FieldRef<"TypingIndicator", 'String'>
    readonly userId: FieldRef<"TypingIndicator", 'String'>
    readonly isTyping: FieldRef<"TypingIndicator", 'Boolean'>
    readonly lastTyping: FieldRef<"TypingIndicator", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TypingIndicator findUnique
   */
  export type TypingIndicatorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TypingIndicator
     */
    select?: TypingIndicatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TypingIndicator
     */
    omit?: TypingIndicatorOmit<ExtArgs> | null
    /**
     * Filter, which TypingIndicator to fetch.
     */
    where: TypingIndicatorWhereUniqueInput
  }

  /**
   * TypingIndicator findUniqueOrThrow
   */
  export type TypingIndicatorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TypingIndicator
     */
    select?: TypingIndicatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TypingIndicator
     */
    omit?: TypingIndicatorOmit<ExtArgs> | null
    /**
     * Filter, which TypingIndicator to fetch.
     */
    where: TypingIndicatorWhereUniqueInput
  }

  /**
   * TypingIndicator findFirst
   */
  export type TypingIndicatorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TypingIndicator
     */
    select?: TypingIndicatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TypingIndicator
     */
    omit?: TypingIndicatorOmit<ExtArgs> | null
    /**
     * Filter, which TypingIndicator to fetch.
     */
    where?: TypingIndicatorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TypingIndicators to fetch.
     */
    orderBy?: TypingIndicatorOrderByWithRelationInput | TypingIndicatorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TypingIndicators.
     */
    cursor?: TypingIndicatorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TypingIndicators from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TypingIndicators.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TypingIndicators.
     */
    distinct?: TypingIndicatorScalarFieldEnum | TypingIndicatorScalarFieldEnum[]
  }

  /**
   * TypingIndicator findFirstOrThrow
   */
  export type TypingIndicatorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TypingIndicator
     */
    select?: TypingIndicatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TypingIndicator
     */
    omit?: TypingIndicatorOmit<ExtArgs> | null
    /**
     * Filter, which TypingIndicator to fetch.
     */
    where?: TypingIndicatorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TypingIndicators to fetch.
     */
    orderBy?: TypingIndicatorOrderByWithRelationInput | TypingIndicatorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TypingIndicators.
     */
    cursor?: TypingIndicatorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TypingIndicators from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TypingIndicators.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TypingIndicators.
     */
    distinct?: TypingIndicatorScalarFieldEnum | TypingIndicatorScalarFieldEnum[]
  }

  /**
   * TypingIndicator findMany
   */
  export type TypingIndicatorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TypingIndicator
     */
    select?: TypingIndicatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TypingIndicator
     */
    omit?: TypingIndicatorOmit<ExtArgs> | null
    /**
     * Filter, which TypingIndicators to fetch.
     */
    where?: TypingIndicatorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TypingIndicators to fetch.
     */
    orderBy?: TypingIndicatorOrderByWithRelationInput | TypingIndicatorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TypingIndicators.
     */
    cursor?: TypingIndicatorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TypingIndicators from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TypingIndicators.
     */
    skip?: number
    distinct?: TypingIndicatorScalarFieldEnum | TypingIndicatorScalarFieldEnum[]
  }

  /**
   * TypingIndicator create
   */
  export type TypingIndicatorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TypingIndicator
     */
    select?: TypingIndicatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TypingIndicator
     */
    omit?: TypingIndicatorOmit<ExtArgs> | null
    /**
     * The data needed to create a TypingIndicator.
     */
    data: XOR<TypingIndicatorCreateInput, TypingIndicatorUncheckedCreateInput>
  }

  /**
   * TypingIndicator createMany
   */
  export type TypingIndicatorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TypingIndicators.
     */
    data: TypingIndicatorCreateManyInput | TypingIndicatorCreateManyInput[]
  }

  /**
   * TypingIndicator update
   */
  export type TypingIndicatorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TypingIndicator
     */
    select?: TypingIndicatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TypingIndicator
     */
    omit?: TypingIndicatorOmit<ExtArgs> | null
    /**
     * The data needed to update a TypingIndicator.
     */
    data: XOR<TypingIndicatorUpdateInput, TypingIndicatorUncheckedUpdateInput>
    /**
     * Choose, which TypingIndicator to update.
     */
    where: TypingIndicatorWhereUniqueInput
  }

  /**
   * TypingIndicator updateMany
   */
  export type TypingIndicatorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TypingIndicators.
     */
    data: XOR<TypingIndicatorUpdateManyMutationInput, TypingIndicatorUncheckedUpdateManyInput>
    /**
     * Filter which TypingIndicators to update
     */
    where?: TypingIndicatorWhereInput
    /**
     * Limit how many TypingIndicators to update.
     */
    limit?: number
  }

  /**
   * TypingIndicator upsert
   */
  export type TypingIndicatorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TypingIndicator
     */
    select?: TypingIndicatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TypingIndicator
     */
    omit?: TypingIndicatorOmit<ExtArgs> | null
    /**
     * The filter to search for the TypingIndicator to update in case it exists.
     */
    where: TypingIndicatorWhereUniqueInput
    /**
     * In case the TypingIndicator found by the `where` argument doesn't exist, create a new TypingIndicator with this data.
     */
    create: XOR<TypingIndicatorCreateInput, TypingIndicatorUncheckedCreateInput>
    /**
     * In case the TypingIndicator was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TypingIndicatorUpdateInput, TypingIndicatorUncheckedUpdateInput>
  }

  /**
   * TypingIndicator delete
   */
  export type TypingIndicatorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TypingIndicator
     */
    select?: TypingIndicatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TypingIndicator
     */
    omit?: TypingIndicatorOmit<ExtArgs> | null
    /**
     * Filter which TypingIndicator to delete.
     */
    where: TypingIndicatorWhereUniqueInput
  }

  /**
   * TypingIndicator deleteMany
   */
  export type TypingIndicatorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TypingIndicators to delete
     */
    where?: TypingIndicatorWhereInput
    /**
     * Limit how many TypingIndicators to delete.
     */
    limit?: number
  }

  /**
   * TypingIndicator findRaw
   */
  export type TypingIndicatorFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * TypingIndicator aggregateRaw
   */
  export type TypingIndicatorAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * TypingIndicator without action
   */
  export type TypingIndicatorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TypingIndicator
     */
    select?: TypingIndicatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TypingIndicator
     */
    omit?: TypingIndicatorOmit<ExtArgs> | null
  }


  /**
   * Model MessageThread
   */

  export type AggregateMessageThread = {
    _count: MessageThreadCountAggregateOutputType | null
    _avg: MessageThreadAvgAggregateOutputType | null
    _sum: MessageThreadSumAggregateOutputType | null
    _min: MessageThreadMinAggregateOutputType | null
    _max: MessageThreadMaxAggregateOutputType | null
  }

  export type MessageThreadAvgAggregateOutputType = {
    messageCount: number | null
  }

  export type MessageThreadSumAggregateOutputType = {
    messageCount: number | null
  }

  export type MessageThreadMinAggregateOutputType = {
    id: string | null
    originalMessageId: string | null
    messageCount: number | null
    lastActivity: Date | null
    createdAt: Date | null
  }

  export type MessageThreadMaxAggregateOutputType = {
    id: string | null
    originalMessageId: string | null
    messageCount: number | null
    lastActivity: Date | null
    createdAt: Date | null
  }

  export type MessageThreadCountAggregateOutputType = {
    id: number
    originalMessageId: number
    participants: number
    messageCount: number
    lastActivity: number
    createdAt: number
    _all: number
  }


  export type MessageThreadAvgAggregateInputType = {
    messageCount?: true
  }

  export type MessageThreadSumAggregateInputType = {
    messageCount?: true
  }

  export type MessageThreadMinAggregateInputType = {
    id?: true
    originalMessageId?: true
    messageCount?: true
    lastActivity?: true
    createdAt?: true
  }

  export type MessageThreadMaxAggregateInputType = {
    id?: true
    originalMessageId?: true
    messageCount?: true
    lastActivity?: true
    createdAt?: true
  }

  export type MessageThreadCountAggregateInputType = {
    id?: true
    originalMessageId?: true
    participants?: true
    messageCount?: true
    lastActivity?: true
    createdAt?: true
    _all?: true
  }

  export type MessageThreadAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MessageThread to aggregate.
     */
    where?: MessageThreadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MessageThreads to fetch.
     */
    orderBy?: MessageThreadOrderByWithRelationInput | MessageThreadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MessageThreadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MessageThreads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MessageThreads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MessageThreads
    **/
    _count?: true | MessageThreadCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MessageThreadAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MessageThreadSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MessageThreadMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MessageThreadMaxAggregateInputType
  }

  export type GetMessageThreadAggregateType<T extends MessageThreadAggregateArgs> = {
        [P in keyof T & keyof AggregateMessageThread]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMessageThread[P]>
      : GetScalarType<T[P], AggregateMessageThread[P]>
  }




  export type MessageThreadGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageThreadWhereInput
    orderBy?: MessageThreadOrderByWithAggregationInput | MessageThreadOrderByWithAggregationInput[]
    by: MessageThreadScalarFieldEnum[] | MessageThreadScalarFieldEnum
    having?: MessageThreadScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MessageThreadCountAggregateInputType | true
    _avg?: MessageThreadAvgAggregateInputType
    _sum?: MessageThreadSumAggregateInputType
    _min?: MessageThreadMinAggregateInputType
    _max?: MessageThreadMaxAggregateInputType
  }

  export type MessageThreadGroupByOutputType = {
    id: string
    originalMessageId: string
    participants: string[]
    messageCount: number
    lastActivity: Date
    createdAt: Date
    _count: MessageThreadCountAggregateOutputType | null
    _avg: MessageThreadAvgAggregateOutputType | null
    _sum: MessageThreadSumAggregateOutputType | null
    _min: MessageThreadMinAggregateOutputType | null
    _max: MessageThreadMaxAggregateOutputType | null
  }

  type GetMessageThreadGroupByPayload<T extends MessageThreadGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MessageThreadGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MessageThreadGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MessageThreadGroupByOutputType[P]>
            : GetScalarType<T[P], MessageThreadGroupByOutputType[P]>
        }
      >
    >


  export type MessageThreadSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    originalMessageId?: boolean
    participants?: boolean
    messageCount?: boolean
    lastActivity?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["messageThread"]>



  export type MessageThreadSelectScalar = {
    id?: boolean
    originalMessageId?: boolean
    participants?: boolean
    messageCount?: boolean
    lastActivity?: boolean
    createdAt?: boolean
  }

  export type MessageThreadOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "originalMessageId" | "participants" | "messageCount" | "lastActivity" | "createdAt", ExtArgs["result"]["messageThread"]>

  export type $MessageThreadPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MessageThread"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      originalMessageId: string
      participants: string[]
      messageCount: number
      lastActivity: Date
      createdAt: Date
    }, ExtArgs["result"]["messageThread"]>
    composites: {}
  }

  type MessageThreadGetPayload<S extends boolean | null | undefined | MessageThreadDefaultArgs> = $Result.GetResult<Prisma.$MessageThreadPayload, S>

  type MessageThreadCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MessageThreadFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MessageThreadCountAggregateInputType | true
    }

  export interface MessageThreadDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MessageThread'], meta: { name: 'MessageThread' } }
    /**
     * Find zero or one MessageThread that matches the filter.
     * @param {MessageThreadFindUniqueArgs} args - Arguments to find a MessageThread
     * @example
     * // Get one MessageThread
     * const messageThread = await prisma.messageThread.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MessageThreadFindUniqueArgs>(args: SelectSubset<T, MessageThreadFindUniqueArgs<ExtArgs>>): Prisma__MessageThreadClient<$Result.GetResult<Prisma.$MessageThreadPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MessageThread that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MessageThreadFindUniqueOrThrowArgs} args - Arguments to find a MessageThread
     * @example
     * // Get one MessageThread
     * const messageThread = await prisma.messageThread.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MessageThreadFindUniqueOrThrowArgs>(args: SelectSubset<T, MessageThreadFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MessageThreadClient<$Result.GetResult<Prisma.$MessageThreadPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MessageThread that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageThreadFindFirstArgs} args - Arguments to find a MessageThread
     * @example
     * // Get one MessageThread
     * const messageThread = await prisma.messageThread.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MessageThreadFindFirstArgs>(args?: SelectSubset<T, MessageThreadFindFirstArgs<ExtArgs>>): Prisma__MessageThreadClient<$Result.GetResult<Prisma.$MessageThreadPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MessageThread that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageThreadFindFirstOrThrowArgs} args - Arguments to find a MessageThread
     * @example
     * // Get one MessageThread
     * const messageThread = await prisma.messageThread.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MessageThreadFindFirstOrThrowArgs>(args?: SelectSubset<T, MessageThreadFindFirstOrThrowArgs<ExtArgs>>): Prisma__MessageThreadClient<$Result.GetResult<Prisma.$MessageThreadPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MessageThreads that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageThreadFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MessageThreads
     * const messageThreads = await prisma.messageThread.findMany()
     * 
     * // Get first 10 MessageThreads
     * const messageThreads = await prisma.messageThread.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const messageThreadWithIdOnly = await prisma.messageThread.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MessageThreadFindManyArgs>(args?: SelectSubset<T, MessageThreadFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessageThreadPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MessageThread.
     * @param {MessageThreadCreateArgs} args - Arguments to create a MessageThread.
     * @example
     * // Create one MessageThread
     * const MessageThread = await prisma.messageThread.create({
     *   data: {
     *     // ... data to create a MessageThread
     *   }
     * })
     * 
     */
    create<T extends MessageThreadCreateArgs>(args: SelectSubset<T, MessageThreadCreateArgs<ExtArgs>>): Prisma__MessageThreadClient<$Result.GetResult<Prisma.$MessageThreadPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MessageThreads.
     * @param {MessageThreadCreateManyArgs} args - Arguments to create many MessageThreads.
     * @example
     * // Create many MessageThreads
     * const messageThread = await prisma.messageThread.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MessageThreadCreateManyArgs>(args?: SelectSubset<T, MessageThreadCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a MessageThread.
     * @param {MessageThreadDeleteArgs} args - Arguments to delete one MessageThread.
     * @example
     * // Delete one MessageThread
     * const MessageThread = await prisma.messageThread.delete({
     *   where: {
     *     // ... filter to delete one MessageThread
     *   }
     * })
     * 
     */
    delete<T extends MessageThreadDeleteArgs>(args: SelectSubset<T, MessageThreadDeleteArgs<ExtArgs>>): Prisma__MessageThreadClient<$Result.GetResult<Prisma.$MessageThreadPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MessageThread.
     * @param {MessageThreadUpdateArgs} args - Arguments to update one MessageThread.
     * @example
     * // Update one MessageThread
     * const messageThread = await prisma.messageThread.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MessageThreadUpdateArgs>(args: SelectSubset<T, MessageThreadUpdateArgs<ExtArgs>>): Prisma__MessageThreadClient<$Result.GetResult<Prisma.$MessageThreadPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MessageThreads.
     * @param {MessageThreadDeleteManyArgs} args - Arguments to filter MessageThreads to delete.
     * @example
     * // Delete a few MessageThreads
     * const { count } = await prisma.messageThread.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MessageThreadDeleteManyArgs>(args?: SelectSubset<T, MessageThreadDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MessageThreads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageThreadUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MessageThreads
     * const messageThread = await prisma.messageThread.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MessageThreadUpdateManyArgs>(args: SelectSubset<T, MessageThreadUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one MessageThread.
     * @param {MessageThreadUpsertArgs} args - Arguments to update or create a MessageThread.
     * @example
     * // Update or create a MessageThread
     * const messageThread = await prisma.messageThread.upsert({
     *   create: {
     *     // ... data to create a MessageThread
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MessageThread we want to update
     *   }
     * })
     */
    upsert<T extends MessageThreadUpsertArgs>(args: SelectSubset<T, MessageThreadUpsertArgs<ExtArgs>>): Prisma__MessageThreadClient<$Result.GetResult<Prisma.$MessageThreadPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MessageThreads that matches the filter.
     * @param {MessageThreadFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const messageThread = await prisma.messageThread.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: MessageThreadFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a MessageThread.
     * @param {MessageThreadAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const messageThread = await prisma.messageThread.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: MessageThreadAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of MessageThreads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageThreadCountArgs} args - Arguments to filter MessageThreads to count.
     * @example
     * // Count the number of MessageThreads
     * const count = await prisma.messageThread.count({
     *   where: {
     *     // ... the filter for the MessageThreads we want to count
     *   }
     * })
    **/
    count<T extends MessageThreadCountArgs>(
      args?: Subset<T, MessageThreadCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MessageThreadCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MessageThread.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageThreadAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MessageThreadAggregateArgs>(args: Subset<T, MessageThreadAggregateArgs>): Prisma.PrismaPromise<GetMessageThreadAggregateType<T>>

    /**
     * Group by MessageThread.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageThreadGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MessageThreadGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MessageThreadGroupByArgs['orderBy'] }
        : { orderBy?: MessageThreadGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MessageThreadGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMessageThreadGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MessageThread model
   */
  readonly fields: MessageThreadFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MessageThread.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MessageThreadClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MessageThread model
   */
  interface MessageThreadFieldRefs {
    readonly id: FieldRef<"MessageThread", 'String'>
    readonly originalMessageId: FieldRef<"MessageThread", 'String'>
    readonly participants: FieldRef<"MessageThread", 'String[]'>
    readonly messageCount: FieldRef<"MessageThread", 'Int'>
    readonly lastActivity: FieldRef<"MessageThread", 'DateTime'>
    readonly createdAt: FieldRef<"MessageThread", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MessageThread findUnique
   */
  export type MessageThreadFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageThread
     */
    select?: MessageThreadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageThread
     */
    omit?: MessageThreadOmit<ExtArgs> | null
    /**
     * Filter, which MessageThread to fetch.
     */
    where: MessageThreadWhereUniqueInput
  }

  /**
   * MessageThread findUniqueOrThrow
   */
  export type MessageThreadFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageThread
     */
    select?: MessageThreadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageThread
     */
    omit?: MessageThreadOmit<ExtArgs> | null
    /**
     * Filter, which MessageThread to fetch.
     */
    where: MessageThreadWhereUniqueInput
  }

  /**
   * MessageThread findFirst
   */
  export type MessageThreadFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageThread
     */
    select?: MessageThreadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageThread
     */
    omit?: MessageThreadOmit<ExtArgs> | null
    /**
     * Filter, which MessageThread to fetch.
     */
    where?: MessageThreadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MessageThreads to fetch.
     */
    orderBy?: MessageThreadOrderByWithRelationInput | MessageThreadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MessageThreads.
     */
    cursor?: MessageThreadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MessageThreads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MessageThreads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MessageThreads.
     */
    distinct?: MessageThreadScalarFieldEnum | MessageThreadScalarFieldEnum[]
  }

  /**
   * MessageThread findFirstOrThrow
   */
  export type MessageThreadFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageThread
     */
    select?: MessageThreadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageThread
     */
    omit?: MessageThreadOmit<ExtArgs> | null
    /**
     * Filter, which MessageThread to fetch.
     */
    where?: MessageThreadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MessageThreads to fetch.
     */
    orderBy?: MessageThreadOrderByWithRelationInput | MessageThreadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MessageThreads.
     */
    cursor?: MessageThreadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MessageThreads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MessageThreads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MessageThreads.
     */
    distinct?: MessageThreadScalarFieldEnum | MessageThreadScalarFieldEnum[]
  }

  /**
   * MessageThread findMany
   */
  export type MessageThreadFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageThread
     */
    select?: MessageThreadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageThread
     */
    omit?: MessageThreadOmit<ExtArgs> | null
    /**
     * Filter, which MessageThreads to fetch.
     */
    where?: MessageThreadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MessageThreads to fetch.
     */
    orderBy?: MessageThreadOrderByWithRelationInput | MessageThreadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MessageThreads.
     */
    cursor?: MessageThreadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MessageThreads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MessageThreads.
     */
    skip?: number
    distinct?: MessageThreadScalarFieldEnum | MessageThreadScalarFieldEnum[]
  }

  /**
   * MessageThread create
   */
  export type MessageThreadCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageThread
     */
    select?: MessageThreadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageThread
     */
    omit?: MessageThreadOmit<ExtArgs> | null
    /**
     * The data needed to create a MessageThread.
     */
    data: XOR<MessageThreadCreateInput, MessageThreadUncheckedCreateInput>
  }

  /**
   * MessageThread createMany
   */
  export type MessageThreadCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MessageThreads.
     */
    data: MessageThreadCreateManyInput | MessageThreadCreateManyInput[]
  }

  /**
   * MessageThread update
   */
  export type MessageThreadUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageThread
     */
    select?: MessageThreadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageThread
     */
    omit?: MessageThreadOmit<ExtArgs> | null
    /**
     * The data needed to update a MessageThread.
     */
    data: XOR<MessageThreadUpdateInput, MessageThreadUncheckedUpdateInput>
    /**
     * Choose, which MessageThread to update.
     */
    where: MessageThreadWhereUniqueInput
  }

  /**
   * MessageThread updateMany
   */
  export type MessageThreadUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MessageThreads.
     */
    data: XOR<MessageThreadUpdateManyMutationInput, MessageThreadUncheckedUpdateManyInput>
    /**
     * Filter which MessageThreads to update
     */
    where?: MessageThreadWhereInput
    /**
     * Limit how many MessageThreads to update.
     */
    limit?: number
  }

  /**
   * MessageThread upsert
   */
  export type MessageThreadUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageThread
     */
    select?: MessageThreadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageThread
     */
    omit?: MessageThreadOmit<ExtArgs> | null
    /**
     * The filter to search for the MessageThread to update in case it exists.
     */
    where: MessageThreadWhereUniqueInput
    /**
     * In case the MessageThread found by the `where` argument doesn't exist, create a new MessageThread with this data.
     */
    create: XOR<MessageThreadCreateInput, MessageThreadUncheckedCreateInput>
    /**
     * In case the MessageThread was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MessageThreadUpdateInput, MessageThreadUncheckedUpdateInput>
  }

  /**
   * MessageThread delete
   */
  export type MessageThreadDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageThread
     */
    select?: MessageThreadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageThread
     */
    omit?: MessageThreadOmit<ExtArgs> | null
    /**
     * Filter which MessageThread to delete.
     */
    where: MessageThreadWhereUniqueInput
  }

  /**
   * MessageThread deleteMany
   */
  export type MessageThreadDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MessageThreads to delete
     */
    where?: MessageThreadWhereInput
    /**
     * Limit how many MessageThreads to delete.
     */
    limit?: number
  }

  /**
   * MessageThread findRaw
   */
  export type MessageThreadFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * MessageThread aggregateRaw
   */
  export type MessageThreadAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * MessageThread without action
   */
  export type MessageThreadDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageThread
     */
    select?: MessageThreadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageThread
     */
    omit?: MessageThreadOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const NotificationScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    type: 'type',
    title: 'title',
    message: 'message',
    data: 'data',
    isRead: 'isRead',
    actionUrl: 'actionUrl',
    createdAt: 'createdAt',
    expiresAt: 'expiresAt'
  };

  export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum]


  export const ConversationScalarFieldEnum: {
    id: 'id',
    type: 'type',
    participants: 'participants',
    name: 'name',
    image: 'image',
    createdBy: 'createdBy',
    lastMessage: 'lastMessage',
    lastActivity: 'lastActivity',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ConversationScalarFieldEnum = (typeof ConversationScalarFieldEnum)[keyof typeof ConversationScalarFieldEnum]


  export const MessageScalarFieldEnum: {
    id: 'id',
    conversationId: 'conversationId',
    senderId: 'senderId',
    content: 'content',
    type: 'type',
    metadata: 'metadata',
    replyToId: 'replyToId',
    isEdited: 'isEdited',
    editedAt: 'editedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MessageScalarFieldEnum = (typeof MessageScalarFieldEnum)[keyof typeof MessageScalarFieldEnum]


  export const MessageStatusRecordScalarFieldEnum: {
    id: 'id',
    messageId: 'messageId',
    userId: 'userId',
    status: 'status',
    timestamp: 'timestamp'
  };

  export type MessageStatusRecordScalarFieldEnum = (typeof MessageStatusRecordScalarFieldEnum)[keyof typeof MessageStatusRecordScalarFieldEnum]


  export const MessageReactionScalarFieldEnum: {
    id: 'id',
    messageId: 'messageId',
    userId: 'userId',
    emoji: 'emoji',
    createdAt: 'createdAt'
  };

  export type MessageReactionScalarFieldEnum = (typeof MessageReactionScalarFieldEnum)[keyof typeof MessageReactionScalarFieldEnum]


  export const UserPresenceScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    isOnline: 'isOnline',
    lastSeen: 'lastSeen',
    status: 'status',
    currentDevice: 'currentDevice',
    updatedAt: 'updatedAt'
  };

  export type UserPresenceScalarFieldEnum = (typeof UserPresenceScalarFieldEnum)[keyof typeof UserPresenceScalarFieldEnum]


  export const NotificationSettingsScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    pushNotifications: 'pushNotifications',
    emailNotifications: 'emailNotifications',
    friendRequests: 'friendRequests',
    messages: 'messages',
    orderUpdates: 'orderUpdates',
    pantryAlerts: 'pantryAlerts',
    recipeShares: 'recipeShares',
    marketplaceUpdates: 'marketplaceUpdates',
    systemAnnouncements: 'systemAnnouncements',
    pushTokens: 'pushTokens',
    emailFrequency: 'emailFrequency',
    quietHoursStart: 'quietHoursStart',
    quietHoursEnd: 'quietHoursEnd',
    timezone: 'timezone',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type NotificationSettingsScalarFieldEnum = (typeof NotificationSettingsScalarFieldEnum)[keyof typeof NotificationSettingsScalarFieldEnum]


  export const TypingIndicatorScalarFieldEnum: {
    id: 'id',
    conversationId: 'conversationId',
    userId: 'userId',
    isTyping: 'isTyping',
    lastTyping: 'lastTyping'
  };

  export type TypingIndicatorScalarFieldEnum = (typeof TypingIndicatorScalarFieldEnum)[keyof typeof TypingIndicatorScalarFieldEnum]


  export const MessageThreadScalarFieldEnum: {
    id: 'id',
    originalMessageId: 'originalMessageId',
    participants: 'participants',
    messageCount: 'messageCount',
    lastActivity: 'lastActivity',
    createdAt: 'createdAt'
  };

  export type MessageThreadScalarFieldEnum = (typeof MessageThreadScalarFieldEnum)[keyof typeof MessageThreadScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'NotificationType'
   */
  export type EnumNotificationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationType'>
    


  /**
   * Reference to a field of type 'NotificationType[]'
   */
  export type ListEnumNotificationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationType[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'ConversationType'
   */
  export type EnumConversationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ConversationType'>
    


  /**
   * Reference to a field of type 'ConversationType[]'
   */
  export type ListEnumConversationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ConversationType[]'>
    


  /**
   * Reference to a field of type 'MessageType'
   */
  export type EnumMessageTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MessageType'>
    


  /**
   * Reference to a field of type 'MessageType[]'
   */
  export type ListEnumMessageTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MessageType[]'>
    


  /**
   * Reference to a field of type 'MessageStatusType'
   */
  export type EnumMessageStatusTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MessageStatusType'>
    


  /**
   * Reference to a field of type 'MessageStatusType[]'
   */
  export type ListEnumMessageStatusTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MessageStatusType[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type NotificationWhereInput = {
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    id?: StringFilter<"Notification"> | string
    userId?: StringFilter<"Notification"> | string
    type?: EnumNotificationTypeFilter<"Notification"> | $Enums.NotificationType
    title?: StringFilter<"Notification"> | string
    message?: StringFilter<"Notification"> | string
    data?: JsonNullableFilter<"Notification">
    isRead?: BoolFilter<"Notification"> | boolean
    actionUrl?: StringNullableFilter<"Notification"> | string | null
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    expiresAt?: DateTimeNullableFilter<"Notification"> | Date | string | null
  }

  export type NotificationOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    message?: SortOrder
    data?: SortOrder
    isRead?: SortOrder
    actionUrl?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type NotificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    userId?: StringFilter<"Notification"> | string
    type?: EnumNotificationTypeFilter<"Notification"> | $Enums.NotificationType
    title?: StringFilter<"Notification"> | string
    message?: StringFilter<"Notification"> | string
    data?: JsonNullableFilter<"Notification">
    isRead?: BoolFilter<"Notification"> | boolean
    actionUrl?: StringNullableFilter<"Notification"> | string | null
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    expiresAt?: DateTimeNullableFilter<"Notification"> | Date | string | null
  }, "id">

  export type NotificationOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    message?: SortOrder
    data?: SortOrder
    isRead?: SortOrder
    actionUrl?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
    _count?: NotificationCountOrderByAggregateInput
    _max?: NotificationMaxOrderByAggregateInput
    _min?: NotificationMinOrderByAggregateInput
  }

  export type NotificationScalarWhereWithAggregatesInput = {
    AND?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    OR?: NotificationScalarWhereWithAggregatesInput[]
    NOT?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Notification"> | string
    userId?: StringWithAggregatesFilter<"Notification"> | string
    type?: EnumNotificationTypeWithAggregatesFilter<"Notification"> | $Enums.NotificationType
    title?: StringWithAggregatesFilter<"Notification"> | string
    message?: StringWithAggregatesFilter<"Notification"> | string
    data?: JsonNullableWithAggregatesFilter<"Notification">
    isRead?: BoolWithAggregatesFilter<"Notification"> | boolean
    actionUrl?: StringNullableWithAggregatesFilter<"Notification"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Notification"> | Date | string
    expiresAt?: DateTimeNullableWithAggregatesFilter<"Notification"> | Date | string | null
  }

  export type ConversationWhereInput = {
    AND?: ConversationWhereInput | ConversationWhereInput[]
    OR?: ConversationWhereInput[]
    NOT?: ConversationWhereInput | ConversationWhereInput[]
    id?: StringFilter<"Conversation"> | string
    type?: EnumConversationTypeFilter<"Conversation"> | $Enums.ConversationType
    participants?: StringNullableListFilter<"Conversation">
    name?: StringNullableFilter<"Conversation"> | string | null
    image?: StringNullableFilter<"Conversation"> | string | null
    createdBy?: StringFilter<"Conversation"> | string
    lastMessage?: JsonNullableFilter<"Conversation">
    lastActivity?: DateTimeFilter<"Conversation"> | Date | string
    isActive?: BoolFilter<"Conversation"> | boolean
    createdAt?: DateTimeFilter<"Conversation"> | Date | string
    updatedAt?: DateTimeFilter<"Conversation"> | Date | string
    messages?: MessageListRelationFilter
  }

  export type ConversationOrderByWithRelationInput = {
    id?: SortOrder
    type?: SortOrder
    participants?: SortOrder
    name?: SortOrder
    image?: SortOrder
    createdBy?: SortOrder
    lastMessage?: SortOrder
    lastActivity?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    messages?: MessageOrderByRelationAggregateInput
  }

  export type ConversationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ConversationWhereInput | ConversationWhereInput[]
    OR?: ConversationWhereInput[]
    NOT?: ConversationWhereInput | ConversationWhereInput[]
    type?: EnumConversationTypeFilter<"Conversation"> | $Enums.ConversationType
    participants?: StringNullableListFilter<"Conversation">
    name?: StringNullableFilter<"Conversation"> | string | null
    image?: StringNullableFilter<"Conversation"> | string | null
    createdBy?: StringFilter<"Conversation"> | string
    lastMessage?: JsonNullableFilter<"Conversation">
    lastActivity?: DateTimeFilter<"Conversation"> | Date | string
    isActive?: BoolFilter<"Conversation"> | boolean
    createdAt?: DateTimeFilter<"Conversation"> | Date | string
    updatedAt?: DateTimeFilter<"Conversation"> | Date | string
    messages?: MessageListRelationFilter
  }, "id">

  export type ConversationOrderByWithAggregationInput = {
    id?: SortOrder
    type?: SortOrder
    participants?: SortOrder
    name?: SortOrder
    image?: SortOrder
    createdBy?: SortOrder
    lastMessage?: SortOrder
    lastActivity?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ConversationCountOrderByAggregateInput
    _max?: ConversationMaxOrderByAggregateInput
    _min?: ConversationMinOrderByAggregateInput
  }

  export type ConversationScalarWhereWithAggregatesInput = {
    AND?: ConversationScalarWhereWithAggregatesInput | ConversationScalarWhereWithAggregatesInput[]
    OR?: ConversationScalarWhereWithAggregatesInput[]
    NOT?: ConversationScalarWhereWithAggregatesInput | ConversationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Conversation"> | string
    type?: EnumConversationTypeWithAggregatesFilter<"Conversation"> | $Enums.ConversationType
    participants?: StringNullableListFilter<"Conversation">
    name?: StringNullableWithAggregatesFilter<"Conversation"> | string | null
    image?: StringNullableWithAggregatesFilter<"Conversation"> | string | null
    createdBy?: StringWithAggregatesFilter<"Conversation"> | string
    lastMessage?: JsonNullableWithAggregatesFilter<"Conversation">
    lastActivity?: DateTimeWithAggregatesFilter<"Conversation"> | Date | string
    isActive?: BoolWithAggregatesFilter<"Conversation"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Conversation"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Conversation"> | Date | string
  }

  export type MessageWhereInput = {
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    id?: StringFilter<"Message"> | string
    conversationId?: StringFilter<"Message"> | string
    senderId?: StringFilter<"Message"> | string
    content?: StringFilter<"Message"> | string
    type?: EnumMessageTypeFilter<"Message"> | $Enums.MessageType
    metadata?: JsonNullableFilter<"Message">
    replyToId?: StringNullableFilter<"Message"> | string | null
    isEdited?: BoolFilter<"Message"> | boolean
    editedAt?: DateTimeNullableFilter<"Message"> | Date | string | null
    createdAt?: DateTimeFilter<"Message"> | Date | string
    updatedAt?: DateTimeFilter<"Message"> | Date | string
    conversation?: XOR<ConversationScalarRelationFilter, ConversationWhereInput>
    replyTo?: XOR<MessageNullableScalarRelationFilter, MessageWhereInput> | null
    replies?: MessageListRelationFilter
    reactions?: MessageReactionListRelationFilter
    status?: MessageStatusRecordListRelationFilter
  }

  export type MessageOrderByWithRelationInput = {
    id?: SortOrder
    conversationId?: SortOrder
    senderId?: SortOrder
    content?: SortOrder
    type?: SortOrder
    metadata?: SortOrder
    replyToId?: SortOrder
    isEdited?: SortOrder
    editedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    conversation?: ConversationOrderByWithRelationInput
    replyTo?: MessageOrderByWithRelationInput
    replies?: MessageOrderByRelationAggregateInput
    reactions?: MessageReactionOrderByRelationAggregateInput
    status?: MessageStatusRecordOrderByRelationAggregateInput
  }

  export type MessageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    conversationId?: StringFilter<"Message"> | string
    senderId?: StringFilter<"Message"> | string
    content?: StringFilter<"Message"> | string
    type?: EnumMessageTypeFilter<"Message"> | $Enums.MessageType
    metadata?: JsonNullableFilter<"Message">
    replyToId?: StringNullableFilter<"Message"> | string | null
    isEdited?: BoolFilter<"Message"> | boolean
    editedAt?: DateTimeNullableFilter<"Message"> | Date | string | null
    createdAt?: DateTimeFilter<"Message"> | Date | string
    updatedAt?: DateTimeFilter<"Message"> | Date | string
    conversation?: XOR<ConversationScalarRelationFilter, ConversationWhereInput>
    replyTo?: XOR<MessageNullableScalarRelationFilter, MessageWhereInput> | null
    replies?: MessageListRelationFilter
    reactions?: MessageReactionListRelationFilter
    status?: MessageStatusRecordListRelationFilter
  }, "id">

  export type MessageOrderByWithAggregationInput = {
    id?: SortOrder
    conversationId?: SortOrder
    senderId?: SortOrder
    content?: SortOrder
    type?: SortOrder
    metadata?: SortOrder
    replyToId?: SortOrder
    isEdited?: SortOrder
    editedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MessageCountOrderByAggregateInput
    _max?: MessageMaxOrderByAggregateInput
    _min?: MessageMinOrderByAggregateInput
  }

  export type MessageScalarWhereWithAggregatesInput = {
    AND?: MessageScalarWhereWithAggregatesInput | MessageScalarWhereWithAggregatesInput[]
    OR?: MessageScalarWhereWithAggregatesInput[]
    NOT?: MessageScalarWhereWithAggregatesInput | MessageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Message"> | string
    conversationId?: StringWithAggregatesFilter<"Message"> | string
    senderId?: StringWithAggregatesFilter<"Message"> | string
    content?: StringWithAggregatesFilter<"Message"> | string
    type?: EnumMessageTypeWithAggregatesFilter<"Message"> | $Enums.MessageType
    metadata?: JsonNullableWithAggregatesFilter<"Message">
    replyToId?: StringNullableWithAggregatesFilter<"Message"> | string | null
    isEdited?: BoolWithAggregatesFilter<"Message"> | boolean
    editedAt?: DateTimeNullableWithAggregatesFilter<"Message"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Message"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Message"> | Date | string
  }

  export type MessageStatusRecordWhereInput = {
    AND?: MessageStatusRecordWhereInput | MessageStatusRecordWhereInput[]
    OR?: MessageStatusRecordWhereInput[]
    NOT?: MessageStatusRecordWhereInput | MessageStatusRecordWhereInput[]
    id?: StringFilter<"MessageStatusRecord"> | string
    messageId?: StringFilter<"MessageStatusRecord"> | string
    userId?: StringFilter<"MessageStatusRecord"> | string
    status?: EnumMessageStatusTypeFilter<"MessageStatusRecord"> | $Enums.MessageStatusType
    timestamp?: DateTimeFilter<"MessageStatusRecord"> | Date | string
    message?: XOR<MessageScalarRelationFilter, MessageWhereInput>
  }

  export type MessageStatusRecordOrderByWithRelationInput = {
    id?: SortOrder
    messageId?: SortOrder
    userId?: SortOrder
    status?: SortOrder
    timestamp?: SortOrder
    message?: MessageOrderByWithRelationInput
  }

  export type MessageStatusRecordWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    messageId_userId?: MessageStatusRecordMessageIdUserIdCompoundUniqueInput
    AND?: MessageStatusRecordWhereInput | MessageStatusRecordWhereInput[]
    OR?: MessageStatusRecordWhereInput[]
    NOT?: MessageStatusRecordWhereInput | MessageStatusRecordWhereInput[]
    messageId?: StringFilter<"MessageStatusRecord"> | string
    userId?: StringFilter<"MessageStatusRecord"> | string
    status?: EnumMessageStatusTypeFilter<"MessageStatusRecord"> | $Enums.MessageStatusType
    timestamp?: DateTimeFilter<"MessageStatusRecord"> | Date | string
    message?: XOR<MessageScalarRelationFilter, MessageWhereInput>
  }, "id" | "messageId_userId">

  export type MessageStatusRecordOrderByWithAggregationInput = {
    id?: SortOrder
    messageId?: SortOrder
    userId?: SortOrder
    status?: SortOrder
    timestamp?: SortOrder
    _count?: MessageStatusRecordCountOrderByAggregateInput
    _max?: MessageStatusRecordMaxOrderByAggregateInput
    _min?: MessageStatusRecordMinOrderByAggregateInput
  }

  export type MessageStatusRecordScalarWhereWithAggregatesInput = {
    AND?: MessageStatusRecordScalarWhereWithAggregatesInput | MessageStatusRecordScalarWhereWithAggregatesInput[]
    OR?: MessageStatusRecordScalarWhereWithAggregatesInput[]
    NOT?: MessageStatusRecordScalarWhereWithAggregatesInput | MessageStatusRecordScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MessageStatusRecord"> | string
    messageId?: StringWithAggregatesFilter<"MessageStatusRecord"> | string
    userId?: StringWithAggregatesFilter<"MessageStatusRecord"> | string
    status?: EnumMessageStatusTypeWithAggregatesFilter<"MessageStatusRecord"> | $Enums.MessageStatusType
    timestamp?: DateTimeWithAggregatesFilter<"MessageStatusRecord"> | Date | string
  }

  export type MessageReactionWhereInput = {
    AND?: MessageReactionWhereInput | MessageReactionWhereInput[]
    OR?: MessageReactionWhereInput[]
    NOT?: MessageReactionWhereInput | MessageReactionWhereInput[]
    id?: StringFilter<"MessageReaction"> | string
    messageId?: StringFilter<"MessageReaction"> | string
    userId?: StringFilter<"MessageReaction"> | string
    emoji?: StringFilter<"MessageReaction"> | string
    createdAt?: DateTimeFilter<"MessageReaction"> | Date | string
    message?: XOR<MessageScalarRelationFilter, MessageWhereInput>
  }

  export type MessageReactionOrderByWithRelationInput = {
    id?: SortOrder
    messageId?: SortOrder
    userId?: SortOrder
    emoji?: SortOrder
    createdAt?: SortOrder
    message?: MessageOrderByWithRelationInput
  }

  export type MessageReactionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    messageId_userId_emoji?: MessageReactionMessageIdUserIdEmojiCompoundUniqueInput
    AND?: MessageReactionWhereInput | MessageReactionWhereInput[]
    OR?: MessageReactionWhereInput[]
    NOT?: MessageReactionWhereInput | MessageReactionWhereInput[]
    messageId?: StringFilter<"MessageReaction"> | string
    userId?: StringFilter<"MessageReaction"> | string
    emoji?: StringFilter<"MessageReaction"> | string
    createdAt?: DateTimeFilter<"MessageReaction"> | Date | string
    message?: XOR<MessageScalarRelationFilter, MessageWhereInput>
  }, "id" | "messageId_userId_emoji">

  export type MessageReactionOrderByWithAggregationInput = {
    id?: SortOrder
    messageId?: SortOrder
    userId?: SortOrder
    emoji?: SortOrder
    createdAt?: SortOrder
    _count?: MessageReactionCountOrderByAggregateInput
    _max?: MessageReactionMaxOrderByAggregateInput
    _min?: MessageReactionMinOrderByAggregateInput
  }

  export type MessageReactionScalarWhereWithAggregatesInput = {
    AND?: MessageReactionScalarWhereWithAggregatesInput | MessageReactionScalarWhereWithAggregatesInput[]
    OR?: MessageReactionScalarWhereWithAggregatesInput[]
    NOT?: MessageReactionScalarWhereWithAggregatesInput | MessageReactionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MessageReaction"> | string
    messageId?: StringWithAggregatesFilter<"MessageReaction"> | string
    userId?: StringWithAggregatesFilter<"MessageReaction"> | string
    emoji?: StringWithAggregatesFilter<"MessageReaction"> | string
    createdAt?: DateTimeWithAggregatesFilter<"MessageReaction"> | Date | string
  }

  export type UserPresenceWhereInput = {
    AND?: UserPresenceWhereInput | UserPresenceWhereInput[]
    OR?: UserPresenceWhereInput[]
    NOT?: UserPresenceWhereInput | UserPresenceWhereInput[]
    id?: StringFilter<"UserPresence"> | string
    userId?: StringFilter<"UserPresence"> | string
    isOnline?: BoolFilter<"UserPresence"> | boolean
    lastSeen?: DateTimeFilter<"UserPresence"> | Date | string
    status?: StringNullableFilter<"UserPresence"> | string | null
    currentDevice?: StringNullableFilter<"UserPresence"> | string | null
    updatedAt?: DateTimeFilter<"UserPresence"> | Date | string
  }

  export type UserPresenceOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    isOnline?: SortOrder
    lastSeen?: SortOrder
    status?: SortOrder
    currentDevice?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserPresenceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: UserPresenceWhereInput | UserPresenceWhereInput[]
    OR?: UserPresenceWhereInput[]
    NOT?: UserPresenceWhereInput | UserPresenceWhereInput[]
    isOnline?: BoolFilter<"UserPresence"> | boolean
    lastSeen?: DateTimeFilter<"UserPresence"> | Date | string
    status?: StringNullableFilter<"UserPresence"> | string | null
    currentDevice?: StringNullableFilter<"UserPresence"> | string | null
    updatedAt?: DateTimeFilter<"UserPresence"> | Date | string
  }, "id" | "userId">

  export type UserPresenceOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    isOnline?: SortOrder
    lastSeen?: SortOrder
    status?: SortOrder
    currentDevice?: SortOrder
    updatedAt?: SortOrder
    _count?: UserPresenceCountOrderByAggregateInput
    _max?: UserPresenceMaxOrderByAggregateInput
    _min?: UserPresenceMinOrderByAggregateInput
  }

  export type UserPresenceScalarWhereWithAggregatesInput = {
    AND?: UserPresenceScalarWhereWithAggregatesInput | UserPresenceScalarWhereWithAggregatesInput[]
    OR?: UserPresenceScalarWhereWithAggregatesInput[]
    NOT?: UserPresenceScalarWhereWithAggregatesInput | UserPresenceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserPresence"> | string
    userId?: StringWithAggregatesFilter<"UserPresence"> | string
    isOnline?: BoolWithAggregatesFilter<"UserPresence"> | boolean
    lastSeen?: DateTimeWithAggregatesFilter<"UserPresence"> | Date | string
    status?: StringNullableWithAggregatesFilter<"UserPresence"> | string | null
    currentDevice?: StringNullableWithAggregatesFilter<"UserPresence"> | string | null
    updatedAt?: DateTimeWithAggregatesFilter<"UserPresence"> | Date | string
  }

  export type NotificationSettingsWhereInput = {
    AND?: NotificationSettingsWhereInput | NotificationSettingsWhereInput[]
    OR?: NotificationSettingsWhereInput[]
    NOT?: NotificationSettingsWhereInput | NotificationSettingsWhereInput[]
    id?: StringFilter<"NotificationSettings"> | string
    userId?: StringFilter<"NotificationSettings"> | string
    pushNotifications?: BoolFilter<"NotificationSettings"> | boolean
    emailNotifications?: BoolFilter<"NotificationSettings"> | boolean
    friendRequests?: BoolFilter<"NotificationSettings"> | boolean
    messages?: BoolFilter<"NotificationSettings"> | boolean
    orderUpdates?: BoolFilter<"NotificationSettings"> | boolean
    pantryAlerts?: BoolFilter<"NotificationSettings"> | boolean
    recipeShares?: BoolFilter<"NotificationSettings"> | boolean
    marketplaceUpdates?: BoolFilter<"NotificationSettings"> | boolean
    systemAnnouncements?: BoolFilter<"NotificationSettings"> | boolean
    pushTokens?: StringNullableListFilter<"NotificationSettings">
    emailFrequency?: StringFilter<"NotificationSettings"> | string
    quietHoursStart?: StringNullableFilter<"NotificationSettings"> | string | null
    quietHoursEnd?: StringNullableFilter<"NotificationSettings"> | string | null
    timezone?: StringFilter<"NotificationSettings"> | string
    createdAt?: DateTimeFilter<"NotificationSettings"> | Date | string
    updatedAt?: DateTimeFilter<"NotificationSettings"> | Date | string
  }

  export type NotificationSettingsOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    pushNotifications?: SortOrder
    emailNotifications?: SortOrder
    friendRequests?: SortOrder
    messages?: SortOrder
    orderUpdates?: SortOrder
    pantryAlerts?: SortOrder
    recipeShares?: SortOrder
    marketplaceUpdates?: SortOrder
    systemAnnouncements?: SortOrder
    pushTokens?: SortOrder
    emailFrequency?: SortOrder
    quietHoursStart?: SortOrder
    quietHoursEnd?: SortOrder
    timezone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NotificationSettingsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: NotificationSettingsWhereInput | NotificationSettingsWhereInput[]
    OR?: NotificationSettingsWhereInput[]
    NOT?: NotificationSettingsWhereInput | NotificationSettingsWhereInput[]
    pushNotifications?: BoolFilter<"NotificationSettings"> | boolean
    emailNotifications?: BoolFilter<"NotificationSettings"> | boolean
    friendRequests?: BoolFilter<"NotificationSettings"> | boolean
    messages?: BoolFilter<"NotificationSettings"> | boolean
    orderUpdates?: BoolFilter<"NotificationSettings"> | boolean
    pantryAlerts?: BoolFilter<"NotificationSettings"> | boolean
    recipeShares?: BoolFilter<"NotificationSettings"> | boolean
    marketplaceUpdates?: BoolFilter<"NotificationSettings"> | boolean
    systemAnnouncements?: BoolFilter<"NotificationSettings"> | boolean
    pushTokens?: StringNullableListFilter<"NotificationSettings">
    emailFrequency?: StringFilter<"NotificationSettings"> | string
    quietHoursStart?: StringNullableFilter<"NotificationSettings"> | string | null
    quietHoursEnd?: StringNullableFilter<"NotificationSettings"> | string | null
    timezone?: StringFilter<"NotificationSettings"> | string
    createdAt?: DateTimeFilter<"NotificationSettings"> | Date | string
    updatedAt?: DateTimeFilter<"NotificationSettings"> | Date | string
  }, "id" | "userId">

  export type NotificationSettingsOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    pushNotifications?: SortOrder
    emailNotifications?: SortOrder
    friendRequests?: SortOrder
    messages?: SortOrder
    orderUpdates?: SortOrder
    pantryAlerts?: SortOrder
    recipeShares?: SortOrder
    marketplaceUpdates?: SortOrder
    systemAnnouncements?: SortOrder
    pushTokens?: SortOrder
    emailFrequency?: SortOrder
    quietHoursStart?: SortOrder
    quietHoursEnd?: SortOrder
    timezone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: NotificationSettingsCountOrderByAggregateInput
    _max?: NotificationSettingsMaxOrderByAggregateInput
    _min?: NotificationSettingsMinOrderByAggregateInput
  }

  export type NotificationSettingsScalarWhereWithAggregatesInput = {
    AND?: NotificationSettingsScalarWhereWithAggregatesInput | NotificationSettingsScalarWhereWithAggregatesInput[]
    OR?: NotificationSettingsScalarWhereWithAggregatesInput[]
    NOT?: NotificationSettingsScalarWhereWithAggregatesInput | NotificationSettingsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"NotificationSettings"> | string
    userId?: StringWithAggregatesFilter<"NotificationSettings"> | string
    pushNotifications?: BoolWithAggregatesFilter<"NotificationSettings"> | boolean
    emailNotifications?: BoolWithAggregatesFilter<"NotificationSettings"> | boolean
    friendRequests?: BoolWithAggregatesFilter<"NotificationSettings"> | boolean
    messages?: BoolWithAggregatesFilter<"NotificationSettings"> | boolean
    orderUpdates?: BoolWithAggregatesFilter<"NotificationSettings"> | boolean
    pantryAlerts?: BoolWithAggregatesFilter<"NotificationSettings"> | boolean
    recipeShares?: BoolWithAggregatesFilter<"NotificationSettings"> | boolean
    marketplaceUpdates?: BoolWithAggregatesFilter<"NotificationSettings"> | boolean
    systemAnnouncements?: BoolWithAggregatesFilter<"NotificationSettings"> | boolean
    pushTokens?: StringNullableListFilter<"NotificationSettings">
    emailFrequency?: StringWithAggregatesFilter<"NotificationSettings"> | string
    quietHoursStart?: StringNullableWithAggregatesFilter<"NotificationSettings"> | string | null
    quietHoursEnd?: StringNullableWithAggregatesFilter<"NotificationSettings"> | string | null
    timezone?: StringWithAggregatesFilter<"NotificationSettings"> | string
    createdAt?: DateTimeWithAggregatesFilter<"NotificationSettings"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"NotificationSettings"> | Date | string
  }

  export type TypingIndicatorWhereInput = {
    AND?: TypingIndicatorWhereInput | TypingIndicatorWhereInput[]
    OR?: TypingIndicatorWhereInput[]
    NOT?: TypingIndicatorWhereInput | TypingIndicatorWhereInput[]
    id?: StringFilter<"TypingIndicator"> | string
    conversationId?: StringFilter<"TypingIndicator"> | string
    userId?: StringFilter<"TypingIndicator"> | string
    isTyping?: BoolFilter<"TypingIndicator"> | boolean
    lastTyping?: DateTimeFilter<"TypingIndicator"> | Date | string
  }

  export type TypingIndicatorOrderByWithRelationInput = {
    id?: SortOrder
    conversationId?: SortOrder
    userId?: SortOrder
    isTyping?: SortOrder
    lastTyping?: SortOrder
  }

  export type TypingIndicatorWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    conversationId_userId?: TypingIndicatorConversationIdUserIdCompoundUniqueInput
    AND?: TypingIndicatorWhereInput | TypingIndicatorWhereInput[]
    OR?: TypingIndicatorWhereInput[]
    NOT?: TypingIndicatorWhereInput | TypingIndicatorWhereInput[]
    conversationId?: StringFilter<"TypingIndicator"> | string
    userId?: StringFilter<"TypingIndicator"> | string
    isTyping?: BoolFilter<"TypingIndicator"> | boolean
    lastTyping?: DateTimeFilter<"TypingIndicator"> | Date | string
  }, "id" | "conversationId_userId">

  export type TypingIndicatorOrderByWithAggregationInput = {
    id?: SortOrder
    conversationId?: SortOrder
    userId?: SortOrder
    isTyping?: SortOrder
    lastTyping?: SortOrder
    _count?: TypingIndicatorCountOrderByAggregateInput
    _max?: TypingIndicatorMaxOrderByAggregateInput
    _min?: TypingIndicatorMinOrderByAggregateInput
  }

  export type TypingIndicatorScalarWhereWithAggregatesInput = {
    AND?: TypingIndicatorScalarWhereWithAggregatesInput | TypingIndicatorScalarWhereWithAggregatesInput[]
    OR?: TypingIndicatorScalarWhereWithAggregatesInput[]
    NOT?: TypingIndicatorScalarWhereWithAggregatesInput | TypingIndicatorScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TypingIndicator"> | string
    conversationId?: StringWithAggregatesFilter<"TypingIndicator"> | string
    userId?: StringWithAggregatesFilter<"TypingIndicator"> | string
    isTyping?: BoolWithAggregatesFilter<"TypingIndicator"> | boolean
    lastTyping?: DateTimeWithAggregatesFilter<"TypingIndicator"> | Date | string
  }

  export type MessageThreadWhereInput = {
    AND?: MessageThreadWhereInput | MessageThreadWhereInput[]
    OR?: MessageThreadWhereInput[]
    NOT?: MessageThreadWhereInput | MessageThreadWhereInput[]
    id?: StringFilter<"MessageThread"> | string
    originalMessageId?: StringFilter<"MessageThread"> | string
    participants?: StringNullableListFilter<"MessageThread">
    messageCount?: IntFilter<"MessageThread"> | number
    lastActivity?: DateTimeFilter<"MessageThread"> | Date | string
    createdAt?: DateTimeFilter<"MessageThread"> | Date | string
  }

  export type MessageThreadOrderByWithRelationInput = {
    id?: SortOrder
    originalMessageId?: SortOrder
    participants?: SortOrder
    messageCount?: SortOrder
    lastActivity?: SortOrder
    createdAt?: SortOrder
  }

  export type MessageThreadWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MessageThreadWhereInput | MessageThreadWhereInput[]
    OR?: MessageThreadWhereInput[]
    NOT?: MessageThreadWhereInput | MessageThreadWhereInput[]
    originalMessageId?: StringFilter<"MessageThread"> | string
    participants?: StringNullableListFilter<"MessageThread">
    messageCount?: IntFilter<"MessageThread"> | number
    lastActivity?: DateTimeFilter<"MessageThread"> | Date | string
    createdAt?: DateTimeFilter<"MessageThread"> | Date | string
  }, "id">

  export type MessageThreadOrderByWithAggregationInput = {
    id?: SortOrder
    originalMessageId?: SortOrder
    participants?: SortOrder
    messageCount?: SortOrder
    lastActivity?: SortOrder
    createdAt?: SortOrder
    _count?: MessageThreadCountOrderByAggregateInput
    _avg?: MessageThreadAvgOrderByAggregateInput
    _max?: MessageThreadMaxOrderByAggregateInput
    _min?: MessageThreadMinOrderByAggregateInput
    _sum?: MessageThreadSumOrderByAggregateInput
  }

  export type MessageThreadScalarWhereWithAggregatesInput = {
    AND?: MessageThreadScalarWhereWithAggregatesInput | MessageThreadScalarWhereWithAggregatesInput[]
    OR?: MessageThreadScalarWhereWithAggregatesInput[]
    NOT?: MessageThreadScalarWhereWithAggregatesInput | MessageThreadScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MessageThread"> | string
    originalMessageId?: StringWithAggregatesFilter<"MessageThread"> | string
    participants?: StringNullableListFilter<"MessageThread">
    messageCount?: IntWithAggregatesFilter<"MessageThread"> | number
    lastActivity?: DateTimeWithAggregatesFilter<"MessageThread"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"MessageThread"> | Date | string
  }

  export type NotificationCreateInput = {
    id?: string
    userId: string
    type: $Enums.NotificationType
    title: string
    message: string
    data?: InputJsonValue | null
    isRead?: boolean
    actionUrl?: string | null
    createdAt?: Date | string
    expiresAt?: Date | string | null
  }

  export type NotificationUncheckedCreateInput = {
    id?: string
    userId: string
    type: $Enums.NotificationType
    title: string
    message: string
    data?: InputJsonValue | null
    isRead?: boolean
    actionUrl?: string | null
    createdAt?: Date | string
    expiresAt?: Date | string | null
  }

  export type NotificationUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    data?: InputJsonValue | InputJsonValue | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    actionUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type NotificationUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    data?: InputJsonValue | InputJsonValue | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    actionUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type NotificationCreateManyInput = {
    id?: string
    userId: string
    type: $Enums.NotificationType
    title: string
    message: string
    data?: InputJsonValue | null
    isRead?: boolean
    actionUrl?: string | null
    createdAt?: Date | string
    expiresAt?: Date | string | null
  }

  export type NotificationUpdateManyMutationInput = {
    userId?: StringFieldUpdateOperationsInput | string
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    data?: InputJsonValue | InputJsonValue | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    actionUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type NotificationUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    data?: InputJsonValue | InputJsonValue | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    actionUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ConversationCreateInput = {
    id?: string
    type?: $Enums.ConversationType
    participants?: ConversationCreateparticipantsInput | string[]
    name?: string | null
    image?: string | null
    createdBy: string
    lastMessage?: InputJsonValue | null
    lastActivity?: Date | string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    messages?: MessageCreateNestedManyWithoutConversationInput
  }

  export type ConversationUncheckedCreateInput = {
    id?: string
    type?: $Enums.ConversationType
    participants?: ConversationCreateparticipantsInput | string[]
    name?: string | null
    image?: string | null
    createdBy: string
    lastMessage?: InputJsonValue | null
    lastActivity?: Date | string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    messages?: MessageUncheckedCreateNestedManyWithoutConversationInput
  }

  export type ConversationUpdateInput = {
    type?: EnumConversationTypeFieldUpdateOperationsInput | $Enums.ConversationType
    participants?: ConversationUpdateparticipantsInput | string[]
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: StringFieldUpdateOperationsInput | string
    lastMessage?: InputJsonValue | InputJsonValue | null
    lastActivity?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: MessageUpdateManyWithoutConversationNestedInput
  }

  export type ConversationUncheckedUpdateInput = {
    type?: EnumConversationTypeFieldUpdateOperationsInput | $Enums.ConversationType
    participants?: ConversationUpdateparticipantsInput | string[]
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: StringFieldUpdateOperationsInput | string
    lastMessage?: InputJsonValue | InputJsonValue | null
    lastActivity?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: MessageUncheckedUpdateManyWithoutConversationNestedInput
  }

  export type ConversationCreateManyInput = {
    id?: string
    type?: $Enums.ConversationType
    participants?: ConversationCreateparticipantsInput | string[]
    name?: string | null
    image?: string | null
    createdBy: string
    lastMessage?: InputJsonValue | null
    lastActivity?: Date | string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ConversationUpdateManyMutationInput = {
    type?: EnumConversationTypeFieldUpdateOperationsInput | $Enums.ConversationType
    participants?: ConversationUpdateparticipantsInput | string[]
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: StringFieldUpdateOperationsInput | string
    lastMessage?: InputJsonValue | InputJsonValue | null
    lastActivity?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConversationUncheckedUpdateManyInput = {
    type?: EnumConversationTypeFieldUpdateOperationsInput | $Enums.ConversationType
    participants?: ConversationUpdateparticipantsInput | string[]
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: StringFieldUpdateOperationsInput | string
    lastMessage?: InputJsonValue | InputJsonValue | null
    lastActivity?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageCreateInput = {
    id?: string
    senderId: string
    content: string
    type?: $Enums.MessageType
    metadata?: InputJsonValue | null
    isEdited?: boolean
    editedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    conversation: ConversationCreateNestedOneWithoutMessagesInput
    replyTo?: MessageCreateNestedOneWithoutRepliesInput
    replies?: MessageCreateNestedManyWithoutReplyToInput
    reactions?: MessageReactionCreateNestedManyWithoutMessageInput
    status?: MessageStatusRecordCreateNestedManyWithoutMessageInput
  }

  export type MessageUncheckedCreateInput = {
    id?: string
    conversationId: string
    senderId: string
    content: string
    type?: $Enums.MessageType
    metadata?: InputJsonValue | null
    replyToId?: string | null
    isEdited?: boolean
    editedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    replies?: MessageUncheckedCreateNestedManyWithoutReplyToInput
    reactions?: MessageReactionUncheckedCreateNestedManyWithoutMessageInput
    status?: MessageStatusRecordUncheckedCreateNestedManyWithoutMessageInput
  }

  export type MessageUpdateInput = {
    senderId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    type?: EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType
    metadata?: InputJsonValue | InputJsonValue | null
    isEdited?: BoolFieldUpdateOperationsInput | boolean
    editedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversation?: ConversationUpdateOneRequiredWithoutMessagesNestedInput
    replyTo?: MessageUpdateOneWithoutRepliesNestedInput
    replies?: MessageUpdateManyWithoutReplyToNestedInput
    reactions?: MessageReactionUpdateManyWithoutMessageNestedInput
    status?: MessageStatusRecordUpdateManyWithoutMessageNestedInput
  }

  export type MessageUncheckedUpdateInput = {
    conversationId?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    type?: EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType
    metadata?: InputJsonValue | InputJsonValue | null
    replyToId?: NullableStringFieldUpdateOperationsInput | string | null
    isEdited?: BoolFieldUpdateOperationsInput | boolean
    editedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    replies?: MessageUncheckedUpdateManyWithoutReplyToNestedInput
    reactions?: MessageReactionUncheckedUpdateManyWithoutMessageNestedInput
    status?: MessageStatusRecordUncheckedUpdateManyWithoutMessageNestedInput
  }

  export type MessageCreateManyInput = {
    id?: string
    conversationId: string
    senderId: string
    content: string
    type?: $Enums.MessageType
    metadata?: InputJsonValue | null
    replyToId?: string | null
    isEdited?: boolean
    editedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MessageUpdateManyMutationInput = {
    senderId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    type?: EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType
    metadata?: InputJsonValue | InputJsonValue | null
    isEdited?: BoolFieldUpdateOperationsInput | boolean
    editedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUncheckedUpdateManyInput = {
    conversationId?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    type?: EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType
    metadata?: InputJsonValue | InputJsonValue | null
    replyToId?: NullableStringFieldUpdateOperationsInput | string | null
    isEdited?: BoolFieldUpdateOperationsInput | boolean
    editedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageStatusRecordCreateInput = {
    id?: string
    userId: string
    status: $Enums.MessageStatusType
    timestamp?: Date | string
    message: MessageCreateNestedOneWithoutStatusInput
  }

  export type MessageStatusRecordUncheckedCreateInput = {
    id?: string
    messageId: string
    userId: string
    status: $Enums.MessageStatusType
    timestamp?: Date | string
  }

  export type MessageStatusRecordUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    status?: EnumMessageStatusTypeFieldUpdateOperationsInput | $Enums.MessageStatusType
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    message?: MessageUpdateOneRequiredWithoutStatusNestedInput
  }

  export type MessageStatusRecordUncheckedUpdateInput = {
    messageId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    status?: EnumMessageStatusTypeFieldUpdateOperationsInput | $Enums.MessageStatusType
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageStatusRecordCreateManyInput = {
    id?: string
    messageId: string
    userId: string
    status: $Enums.MessageStatusType
    timestamp?: Date | string
  }

  export type MessageStatusRecordUpdateManyMutationInput = {
    userId?: StringFieldUpdateOperationsInput | string
    status?: EnumMessageStatusTypeFieldUpdateOperationsInput | $Enums.MessageStatusType
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageStatusRecordUncheckedUpdateManyInput = {
    messageId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    status?: EnumMessageStatusTypeFieldUpdateOperationsInput | $Enums.MessageStatusType
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageReactionCreateInput = {
    id?: string
    userId: string
    emoji: string
    createdAt?: Date | string
    message: MessageCreateNestedOneWithoutReactionsInput
  }

  export type MessageReactionUncheckedCreateInput = {
    id?: string
    messageId: string
    userId: string
    emoji: string
    createdAt?: Date | string
  }

  export type MessageReactionUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    emoji?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    message?: MessageUpdateOneRequiredWithoutReactionsNestedInput
  }

  export type MessageReactionUncheckedUpdateInput = {
    messageId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    emoji?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageReactionCreateManyInput = {
    id?: string
    messageId: string
    userId: string
    emoji: string
    createdAt?: Date | string
  }

  export type MessageReactionUpdateManyMutationInput = {
    userId?: StringFieldUpdateOperationsInput | string
    emoji?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageReactionUncheckedUpdateManyInput = {
    messageId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    emoji?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserPresenceCreateInput = {
    id?: string
    userId: string
    isOnline?: boolean
    lastSeen?: Date | string
    status?: string | null
    currentDevice?: string | null
    updatedAt?: Date | string
  }

  export type UserPresenceUncheckedCreateInput = {
    id?: string
    userId: string
    isOnline?: boolean
    lastSeen?: Date | string
    status?: string | null
    currentDevice?: string | null
    updatedAt?: Date | string
  }

  export type UserPresenceUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    lastSeen?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: NullableStringFieldUpdateOperationsInput | string | null
    currentDevice?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserPresenceUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    lastSeen?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: NullableStringFieldUpdateOperationsInput | string | null
    currentDevice?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserPresenceCreateManyInput = {
    id?: string
    userId: string
    isOnline?: boolean
    lastSeen?: Date | string
    status?: string | null
    currentDevice?: string | null
    updatedAt?: Date | string
  }

  export type UserPresenceUpdateManyMutationInput = {
    userId?: StringFieldUpdateOperationsInput | string
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    lastSeen?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: NullableStringFieldUpdateOperationsInput | string | null
    currentDevice?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserPresenceUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    lastSeen?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: NullableStringFieldUpdateOperationsInput | string | null
    currentDevice?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationSettingsCreateInput = {
    id?: string
    userId: string
    pushNotifications?: boolean
    emailNotifications?: boolean
    friendRequests?: boolean
    messages?: boolean
    orderUpdates?: boolean
    pantryAlerts?: boolean
    recipeShares?: boolean
    marketplaceUpdates?: boolean
    systemAnnouncements?: boolean
    pushTokens?: NotificationSettingsCreatepushTokensInput | string[]
    emailFrequency?: string
    quietHoursStart?: string | null
    quietHoursEnd?: string | null
    timezone?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NotificationSettingsUncheckedCreateInput = {
    id?: string
    userId: string
    pushNotifications?: boolean
    emailNotifications?: boolean
    friendRequests?: boolean
    messages?: boolean
    orderUpdates?: boolean
    pantryAlerts?: boolean
    recipeShares?: boolean
    marketplaceUpdates?: boolean
    systemAnnouncements?: boolean
    pushTokens?: NotificationSettingsCreatepushTokensInput | string[]
    emailFrequency?: string
    quietHoursStart?: string | null
    quietHoursEnd?: string | null
    timezone?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NotificationSettingsUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    pushNotifications?: BoolFieldUpdateOperationsInput | boolean
    emailNotifications?: BoolFieldUpdateOperationsInput | boolean
    friendRequests?: BoolFieldUpdateOperationsInput | boolean
    messages?: BoolFieldUpdateOperationsInput | boolean
    orderUpdates?: BoolFieldUpdateOperationsInput | boolean
    pantryAlerts?: BoolFieldUpdateOperationsInput | boolean
    recipeShares?: BoolFieldUpdateOperationsInput | boolean
    marketplaceUpdates?: BoolFieldUpdateOperationsInput | boolean
    systemAnnouncements?: BoolFieldUpdateOperationsInput | boolean
    pushTokens?: NotificationSettingsUpdatepushTokensInput | string[]
    emailFrequency?: StringFieldUpdateOperationsInput | string
    quietHoursStart?: NullableStringFieldUpdateOperationsInput | string | null
    quietHoursEnd?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationSettingsUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    pushNotifications?: BoolFieldUpdateOperationsInput | boolean
    emailNotifications?: BoolFieldUpdateOperationsInput | boolean
    friendRequests?: BoolFieldUpdateOperationsInput | boolean
    messages?: BoolFieldUpdateOperationsInput | boolean
    orderUpdates?: BoolFieldUpdateOperationsInput | boolean
    pantryAlerts?: BoolFieldUpdateOperationsInput | boolean
    recipeShares?: BoolFieldUpdateOperationsInput | boolean
    marketplaceUpdates?: BoolFieldUpdateOperationsInput | boolean
    systemAnnouncements?: BoolFieldUpdateOperationsInput | boolean
    pushTokens?: NotificationSettingsUpdatepushTokensInput | string[]
    emailFrequency?: StringFieldUpdateOperationsInput | string
    quietHoursStart?: NullableStringFieldUpdateOperationsInput | string | null
    quietHoursEnd?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationSettingsCreateManyInput = {
    id?: string
    userId: string
    pushNotifications?: boolean
    emailNotifications?: boolean
    friendRequests?: boolean
    messages?: boolean
    orderUpdates?: boolean
    pantryAlerts?: boolean
    recipeShares?: boolean
    marketplaceUpdates?: boolean
    systemAnnouncements?: boolean
    pushTokens?: NotificationSettingsCreatepushTokensInput | string[]
    emailFrequency?: string
    quietHoursStart?: string | null
    quietHoursEnd?: string | null
    timezone?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NotificationSettingsUpdateManyMutationInput = {
    userId?: StringFieldUpdateOperationsInput | string
    pushNotifications?: BoolFieldUpdateOperationsInput | boolean
    emailNotifications?: BoolFieldUpdateOperationsInput | boolean
    friendRequests?: BoolFieldUpdateOperationsInput | boolean
    messages?: BoolFieldUpdateOperationsInput | boolean
    orderUpdates?: BoolFieldUpdateOperationsInput | boolean
    pantryAlerts?: BoolFieldUpdateOperationsInput | boolean
    recipeShares?: BoolFieldUpdateOperationsInput | boolean
    marketplaceUpdates?: BoolFieldUpdateOperationsInput | boolean
    systemAnnouncements?: BoolFieldUpdateOperationsInput | boolean
    pushTokens?: NotificationSettingsUpdatepushTokensInput | string[]
    emailFrequency?: StringFieldUpdateOperationsInput | string
    quietHoursStart?: NullableStringFieldUpdateOperationsInput | string | null
    quietHoursEnd?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationSettingsUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    pushNotifications?: BoolFieldUpdateOperationsInput | boolean
    emailNotifications?: BoolFieldUpdateOperationsInput | boolean
    friendRequests?: BoolFieldUpdateOperationsInput | boolean
    messages?: BoolFieldUpdateOperationsInput | boolean
    orderUpdates?: BoolFieldUpdateOperationsInput | boolean
    pantryAlerts?: BoolFieldUpdateOperationsInput | boolean
    recipeShares?: BoolFieldUpdateOperationsInput | boolean
    marketplaceUpdates?: BoolFieldUpdateOperationsInput | boolean
    systemAnnouncements?: BoolFieldUpdateOperationsInput | boolean
    pushTokens?: NotificationSettingsUpdatepushTokensInput | string[]
    emailFrequency?: StringFieldUpdateOperationsInput | string
    quietHoursStart?: NullableStringFieldUpdateOperationsInput | string | null
    quietHoursEnd?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TypingIndicatorCreateInput = {
    id?: string
    conversationId: string
    userId: string
    isTyping?: boolean
    lastTyping?: Date | string
  }

  export type TypingIndicatorUncheckedCreateInput = {
    id?: string
    conversationId: string
    userId: string
    isTyping?: boolean
    lastTyping?: Date | string
  }

  export type TypingIndicatorUpdateInput = {
    conversationId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    isTyping?: BoolFieldUpdateOperationsInput | boolean
    lastTyping?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TypingIndicatorUncheckedUpdateInput = {
    conversationId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    isTyping?: BoolFieldUpdateOperationsInput | boolean
    lastTyping?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TypingIndicatorCreateManyInput = {
    id?: string
    conversationId: string
    userId: string
    isTyping?: boolean
    lastTyping?: Date | string
  }

  export type TypingIndicatorUpdateManyMutationInput = {
    conversationId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    isTyping?: BoolFieldUpdateOperationsInput | boolean
    lastTyping?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TypingIndicatorUncheckedUpdateManyInput = {
    conversationId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    isTyping?: BoolFieldUpdateOperationsInput | boolean
    lastTyping?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageThreadCreateInput = {
    id?: string
    originalMessageId: string
    participants?: MessageThreadCreateparticipantsInput | string[]
    messageCount?: number
    lastActivity?: Date | string
    createdAt?: Date | string
  }

  export type MessageThreadUncheckedCreateInput = {
    id?: string
    originalMessageId: string
    participants?: MessageThreadCreateparticipantsInput | string[]
    messageCount?: number
    lastActivity?: Date | string
    createdAt?: Date | string
  }

  export type MessageThreadUpdateInput = {
    originalMessageId?: StringFieldUpdateOperationsInput | string
    participants?: MessageThreadUpdateparticipantsInput | string[]
    messageCount?: IntFieldUpdateOperationsInput | number
    lastActivity?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageThreadUncheckedUpdateInput = {
    originalMessageId?: StringFieldUpdateOperationsInput | string
    participants?: MessageThreadUpdateparticipantsInput | string[]
    messageCount?: IntFieldUpdateOperationsInput | number
    lastActivity?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageThreadCreateManyInput = {
    id?: string
    originalMessageId: string
    participants?: MessageThreadCreateparticipantsInput | string[]
    messageCount?: number
    lastActivity?: Date | string
    createdAt?: Date | string
  }

  export type MessageThreadUpdateManyMutationInput = {
    originalMessageId?: StringFieldUpdateOperationsInput | string
    participants?: MessageThreadUpdateparticipantsInput | string[]
    messageCount?: IntFieldUpdateOperationsInput | number
    lastActivity?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageThreadUncheckedUpdateManyInput = {
    originalMessageId?: StringFieldUpdateOperationsInput | string
    participants?: MessageThreadUpdateparticipantsInput | string[]
    messageCount?: IntFieldUpdateOperationsInput | number
    lastActivity?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumNotificationTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | EnumNotificationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationTypeFilter<$PrismaModel> | $Enums.NotificationType
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    isSet?: boolean
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
    isSet?: boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
    isSet?: boolean
  }

  export type NotificationCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    message?: SortOrder
    data?: SortOrder
    isRead?: SortOrder
    actionUrl?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type NotificationMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    message?: SortOrder
    isRead?: SortOrder
    actionUrl?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type NotificationMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    message?: SortOrder
    isRead?: SortOrder
    actionUrl?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumNotificationTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | EnumNotificationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationTypeWithAggregatesFilter<$PrismaModel> | $Enums.NotificationType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNotificationTypeFilter<$PrismaModel>
    _max?: NestedEnumNotificationTypeFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type EnumConversationTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ConversationType | EnumConversationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ConversationType[] | ListEnumConversationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConversationType[] | ListEnumConversationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumConversationTypeFilter<$PrismaModel> | $Enums.ConversationType
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type MessageListRelationFilter = {
    every?: MessageWhereInput
    some?: MessageWhereInput
    none?: MessageWhereInput
  }

  export type MessageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ConversationCountOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    participants?: SortOrder
    name?: SortOrder
    image?: SortOrder
    createdBy?: SortOrder
    lastMessage?: SortOrder
    lastActivity?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ConversationMaxOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    name?: SortOrder
    image?: SortOrder
    createdBy?: SortOrder
    lastActivity?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ConversationMinOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    name?: SortOrder
    image?: SortOrder
    createdBy?: SortOrder
    lastActivity?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumConversationTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ConversationType | EnumConversationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ConversationType[] | ListEnumConversationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConversationType[] | ListEnumConversationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumConversationTypeWithAggregatesFilter<$PrismaModel> | $Enums.ConversationType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumConversationTypeFilter<$PrismaModel>
    _max?: NestedEnumConversationTypeFilter<$PrismaModel>
  }

  export type EnumMessageTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.MessageType | EnumMessageTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MessageType[] | ListEnumMessageTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.MessageType[] | ListEnumMessageTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumMessageTypeFilter<$PrismaModel> | $Enums.MessageType
  }

  export type ConversationScalarRelationFilter = {
    is?: ConversationWhereInput
    isNot?: ConversationWhereInput
  }

  export type MessageNullableScalarRelationFilter = {
    is?: MessageWhereInput | null
    isNot?: MessageWhereInput | null
  }

  export type MessageReactionListRelationFilter = {
    every?: MessageReactionWhereInput
    some?: MessageReactionWhereInput
    none?: MessageReactionWhereInput
  }

  export type MessageStatusRecordListRelationFilter = {
    every?: MessageStatusRecordWhereInput
    some?: MessageStatusRecordWhereInput
    none?: MessageStatusRecordWhereInput
  }

  export type MessageReactionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MessageStatusRecordOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MessageCountOrderByAggregateInput = {
    id?: SortOrder
    conversationId?: SortOrder
    senderId?: SortOrder
    content?: SortOrder
    type?: SortOrder
    metadata?: SortOrder
    replyToId?: SortOrder
    isEdited?: SortOrder
    editedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MessageMaxOrderByAggregateInput = {
    id?: SortOrder
    conversationId?: SortOrder
    senderId?: SortOrder
    content?: SortOrder
    type?: SortOrder
    replyToId?: SortOrder
    isEdited?: SortOrder
    editedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MessageMinOrderByAggregateInput = {
    id?: SortOrder
    conversationId?: SortOrder
    senderId?: SortOrder
    content?: SortOrder
    type?: SortOrder
    replyToId?: SortOrder
    isEdited?: SortOrder
    editedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumMessageTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MessageType | EnumMessageTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MessageType[] | ListEnumMessageTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.MessageType[] | ListEnumMessageTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumMessageTypeWithAggregatesFilter<$PrismaModel> | $Enums.MessageType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMessageTypeFilter<$PrismaModel>
    _max?: NestedEnumMessageTypeFilter<$PrismaModel>
  }

  export type EnumMessageStatusTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.MessageStatusType | EnumMessageStatusTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MessageStatusType[] | ListEnumMessageStatusTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.MessageStatusType[] | ListEnumMessageStatusTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumMessageStatusTypeFilter<$PrismaModel> | $Enums.MessageStatusType
  }

  export type MessageScalarRelationFilter = {
    is?: MessageWhereInput
    isNot?: MessageWhereInput
  }

  export type MessageStatusRecordMessageIdUserIdCompoundUniqueInput = {
    messageId: string
    userId: string
  }

  export type MessageStatusRecordCountOrderByAggregateInput = {
    id?: SortOrder
    messageId?: SortOrder
    userId?: SortOrder
    status?: SortOrder
    timestamp?: SortOrder
  }

  export type MessageStatusRecordMaxOrderByAggregateInput = {
    id?: SortOrder
    messageId?: SortOrder
    userId?: SortOrder
    status?: SortOrder
    timestamp?: SortOrder
  }

  export type MessageStatusRecordMinOrderByAggregateInput = {
    id?: SortOrder
    messageId?: SortOrder
    userId?: SortOrder
    status?: SortOrder
    timestamp?: SortOrder
  }

  export type EnumMessageStatusTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MessageStatusType | EnumMessageStatusTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MessageStatusType[] | ListEnumMessageStatusTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.MessageStatusType[] | ListEnumMessageStatusTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumMessageStatusTypeWithAggregatesFilter<$PrismaModel> | $Enums.MessageStatusType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMessageStatusTypeFilter<$PrismaModel>
    _max?: NestedEnumMessageStatusTypeFilter<$PrismaModel>
  }

  export type MessageReactionMessageIdUserIdEmojiCompoundUniqueInput = {
    messageId: string
    userId: string
    emoji: string
  }

  export type MessageReactionCountOrderByAggregateInput = {
    id?: SortOrder
    messageId?: SortOrder
    userId?: SortOrder
    emoji?: SortOrder
    createdAt?: SortOrder
  }

  export type MessageReactionMaxOrderByAggregateInput = {
    id?: SortOrder
    messageId?: SortOrder
    userId?: SortOrder
    emoji?: SortOrder
    createdAt?: SortOrder
  }

  export type MessageReactionMinOrderByAggregateInput = {
    id?: SortOrder
    messageId?: SortOrder
    userId?: SortOrder
    emoji?: SortOrder
    createdAt?: SortOrder
  }

  export type UserPresenceCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    isOnline?: SortOrder
    lastSeen?: SortOrder
    status?: SortOrder
    currentDevice?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserPresenceMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    isOnline?: SortOrder
    lastSeen?: SortOrder
    status?: SortOrder
    currentDevice?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserPresenceMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    isOnline?: SortOrder
    lastSeen?: SortOrder
    status?: SortOrder
    currentDevice?: SortOrder
    updatedAt?: SortOrder
  }

  export type NotificationSettingsCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    pushNotifications?: SortOrder
    emailNotifications?: SortOrder
    friendRequests?: SortOrder
    messages?: SortOrder
    orderUpdates?: SortOrder
    pantryAlerts?: SortOrder
    recipeShares?: SortOrder
    marketplaceUpdates?: SortOrder
    systemAnnouncements?: SortOrder
    pushTokens?: SortOrder
    emailFrequency?: SortOrder
    quietHoursStart?: SortOrder
    quietHoursEnd?: SortOrder
    timezone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NotificationSettingsMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    pushNotifications?: SortOrder
    emailNotifications?: SortOrder
    friendRequests?: SortOrder
    messages?: SortOrder
    orderUpdates?: SortOrder
    pantryAlerts?: SortOrder
    recipeShares?: SortOrder
    marketplaceUpdates?: SortOrder
    systemAnnouncements?: SortOrder
    emailFrequency?: SortOrder
    quietHoursStart?: SortOrder
    quietHoursEnd?: SortOrder
    timezone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NotificationSettingsMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    pushNotifications?: SortOrder
    emailNotifications?: SortOrder
    friendRequests?: SortOrder
    messages?: SortOrder
    orderUpdates?: SortOrder
    pantryAlerts?: SortOrder
    recipeShares?: SortOrder
    marketplaceUpdates?: SortOrder
    systemAnnouncements?: SortOrder
    emailFrequency?: SortOrder
    quietHoursStart?: SortOrder
    quietHoursEnd?: SortOrder
    timezone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TypingIndicatorConversationIdUserIdCompoundUniqueInput = {
    conversationId: string
    userId: string
  }

  export type TypingIndicatorCountOrderByAggregateInput = {
    id?: SortOrder
    conversationId?: SortOrder
    userId?: SortOrder
    isTyping?: SortOrder
    lastTyping?: SortOrder
  }

  export type TypingIndicatorMaxOrderByAggregateInput = {
    id?: SortOrder
    conversationId?: SortOrder
    userId?: SortOrder
    isTyping?: SortOrder
    lastTyping?: SortOrder
  }

  export type TypingIndicatorMinOrderByAggregateInput = {
    id?: SortOrder
    conversationId?: SortOrder
    userId?: SortOrder
    isTyping?: SortOrder
    lastTyping?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type MessageThreadCountOrderByAggregateInput = {
    id?: SortOrder
    originalMessageId?: SortOrder
    participants?: SortOrder
    messageCount?: SortOrder
    lastActivity?: SortOrder
    createdAt?: SortOrder
  }

  export type MessageThreadAvgOrderByAggregateInput = {
    messageCount?: SortOrder
  }

  export type MessageThreadMaxOrderByAggregateInput = {
    id?: SortOrder
    originalMessageId?: SortOrder
    messageCount?: SortOrder
    lastActivity?: SortOrder
    createdAt?: SortOrder
  }

  export type MessageThreadMinOrderByAggregateInput = {
    id?: SortOrder
    originalMessageId?: SortOrder
    messageCount?: SortOrder
    lastActivity?: SortOrder
    createdAt?: SortOrder
  }

  export type MessageThreadSumOrderByAggregateInput = {
    messageCount?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumNotificationTypeFieldUpdateOperationsInput = {
    set?: $Enums.NotificationType
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
    unset?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
    unset?: boolean
  }

  export type ConversationCreateparticipantsInput = {
    set: string[]
  }

  export type MessageCreateNestedManyWithoutConversationInput = {
    create?: XOR<MessageCreateWithoutConversationInput, MessageUncheckedCreateWithoutConversationInput> | MessageCreateWithoutConversationInput[] | MessageUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutConversationInput | MessageCreateOrConnectWithoutConversationInput[]
    createMany?: MessageCreateManyConversationInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type MessageUncheckedCreateNestedManyWithoutConversationInput = {
    create?: XOR<MessageCreateWithoutConversationInput, MessageUncheckedCreateWithoutConversationInput> | MessageCreateWithoutConversationInput[] | MessageUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutConversationInput | MessageCreateOrConnectWithoutConversationInput[]
    createMany?: MessageCreateManyConversationInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type EnumConversationTypeFieldUpdateOperationsInput = {
    set?: $Enums.ConversationType
  }

  export type ConversationUpdateparticipantsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type MessageUpdateManyWithoutConversationNestedInput = {
    create?: XOR<MessageCreateWithoutConversationInput, MessageUncheckedCreateWithoutConversationInput> | MessageCreateWithoutConversationInput[] | MessageUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutConversationInput | MessageCreateOrConnectWithoutConversationInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutConversationInput | MessageUpsertWithWhereUniqueWithoutConversationInput[]
    createMany?: MessageCreateManyConversationInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutConversationInput | MessageUpdateWithWhereUniqueWithoutConversationInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutConversationInput | MessageUpdateManyWithWhereWithoutConversationInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type MessageUncheckedUpdateManyWithoutConversationNestedInput = {
    create?: XOR<MessageCreateWithoutConversationInput, MessageUncheckedCreateWithoutConversationInput> | MessageCreateWithoutConversationInput[] | MessageUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutConversationInput | MessageCreateOrConnectWithoutConversationInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutConversationInput | MessageUpsertWithWhereUniqueWithoutConversationInput[]
    createMany?: MessageCreateManyConversationInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutConversationInput | MessageUpdateWithWhereUniqueWithoutConversationInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutConversationInput | MessageUpdateManyWithWhereWithoutConversationInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type ConversationCreateNestedOneWithoutMessagesInput = {
    create?: XOR<ConversationCreateWithoutMessagesInput, ConversationUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: ConversationCreateOrConnectWithoutMessagesInput
    connect?: ConversationWhereUniqueInput
  }

  export type MessageCreateNestedOneWithoutRepliesInput = {
    create?: XOR<MessageCreateWithoutRepliesInput, MessageUncheckedCreateWithoutRepliesInput>
    connectOrCreate?: MessageCreateOrConnectWithoutRepliesInput
    connect?: MessageWhereUniqueInput
  }

  export type MessageCreateNestedManyWithoutReplyToInput = {
    create?: XOR<MessageCreateWithoutReplyToInput, MessageUncheckedCreateWithoutReplyToInput> | MessageCreateWithoutReplyToInput[] | MessageUncheckedCreateWithoutReplyToInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutReplyToInput | MessageCreateOrConnectWithoutReplyToInput[]
    createMany?: MessageCreateManyReplyToInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type MessageReactionCreateNestedManyWithoutMessageInput = {
    create?: XOR<MessageReactionCreateWithoutMessageInput, MessageReactionUncheckedCreateWithoutMessageInput> | MessageReactionCreateWithoutMessageInput[] | MessageReactionUncheckedCreateWithoutMessageInput[]
    connectOrCreate?: MessageReactionCreateOrConnectWithoutMessageInput | MessageReactionCreateOrConnectWithoutMessageInput[]
    createMany?: MessageReactionCreateManyMessageInputEnvelope
    connect?: MessageReactionWhereUniqueInput | MessageReactionWhereUniqueInput[]
  }

  export type MessageStatusRecordCreateNestedManyWithoutMessageInput = {
    create?: XOR<MessageStatusRecordCreateWithoutMessageInput, MessageStatusRecordUncheckedCreateWithoutMessageInput> | MessageStatusRecordCreateWithoutMessageInput[] | MessageStatusRecordUncheckedCreateWithoutMessageInput[]
    connectOrCreate?: MessageStatusRecordCreateOrConnectWithoutMessageInput | MessageStatusRecordCreateOrConnectWithoutMessageInput[]
    createMany?: MessageStatusRecordCreateManyMessageInputEnvelope
    connect?: MessageStatusRecordWhereUniqueInput | MessageStatusRecordWhereUniqueInput[]
  }

  export type MessageUncheckedCreateNestedManyWithoutReplyToInput = {
    create?: XOR<MessageCreateWithoutReplyToInput, MessageUncheckedCreateWithoutReplyToInput> | MessageCreateWithoutReplyToInput[] | MessageUncheckedCreateWithoutReplyToInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutReplyToInput | MessageCreateOrConnectWithoutReplyToInput[]
    createMany?: MessageCreateManyReplyToInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type MessageReactionUncheckedCreateNestedManyWithoutMessageInput = {
    create?: XOR<MessageReactionCreateWithoutMessageInput, MessageReactionUncheckedCreateWithoutMessageInput> | MessageReactionCreateWithoutMessageInput[] | MessageReactionUncheckedCreateWithoutMessageInput[]
    connectOrCreate?: MessageReactionCreateOrConnectWithoutMessageInput | MessageReactionCreateOrConnectWithoutMessageInput[]
    createMany?: MessageReactionCreateManyMessageInputEnvelope
    connect?: MessageReactionWhereUniqueInput | MessageReactionWhereUniqueInput[]
  }

  export type MessageStatusRecordUncheckedCreateNestedManyWithoutMessageInput = {
    create?: XOR<MessageStatusRecordCreateWithoutMessageInput, MessageStatusRecordUncheckedCreateWithoutMessageInput> | MessageStatusRecordCreateWithoutMessageInput[] | MessageStatusRecordUncheckedCreateWithoutMessageInput[]
    connectOrCreate?: MessageStatusRecordCreateOrConnectWithoutMessageInput | MessageStatusRecordCreateOrConnectWithoutMessageInput[]
    createMany?: MessageStatusRecordCreateManyMessageInputEnvelope
    connect?: MessageStatusRecordWhereUniqueInput | MessageStatusRecordWhereUniqueInput[]
  }

  export type EnumMessageTypeFieldUpdateOperationsInput = {
    set?: $Enums.MessageType
  }

  export type ConversationUpdateOneRequiredWithoutMessagesNestedInput = {
    create?: XOR<ConversationCreateWithoutMessagesInput, ConversationUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: ConversationCreateOrConnectWithoutMessagesInput
    upsert?: ConversationUpsertWithoutMessagesInput
    connect?: ConversationWhereUniqueInput
    update?: XOR<XOR<ConversationUpdateToOneWithWhereWithoutMessagesInput, ConversationUpdateWithoutMessagesInput>, ConversationUncheckedUpdateWithoutMessagesInput>
  }

  export type MessageUpdateOneWithoutRepliesNestedInput = {
    create?: XOR<MessageCreateWithoutRepliesInput, MessageUncheckedCreateWithoutRepliesInput>
    connectOrCreate?: MessageCreateOrConnectWithoutRepliesInput
    upsert?: MessageUpsertWithoutRepliesInput
    disconnect?: boolean
    delete?: MessageWhereInput | boolean
    connect?: MessageWhereUniqueInput
    update?: XOR<XOR<MessageUpdateToOneWithWhereWithoutRepliesInput, MessageUpdateWithoutRepliesInput>, MessageUncheckedUpdateWithoutRepliesInput>
  }

  export type MessageUpdateManyWithoutReplyToNestedInput = {
    create?: XOR<MessageCreateWithoutReplyToInput, MessageUncheckedCreateWithoutReplyToInput> | MessageCreateWithoutReplyToInput[] | MessageUncheckedCreateWithoutReplyToInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutReplyToInput | MessageCreateOrConnectWithoutReplyToInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutReplyToInput | MessageUpsertWithWhereUniqueWithoutReplyToInput[]
    createMany?: MessageCreateManyReplyToInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutReplyToInput | MessageUpdateWithWhereUniqueWithoutReplyToInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutReplyToInput | MessageUpdateManyWithWhereWithoutReplyToInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type MessageReactionUpdateManyWithoutMessageNestedInput = {
    create?: XOR<MessageReactionCreateWithoutMessageInput, MessageReactionUncheckedCreateWithoutMessageInput> | MessageReactionCreateWithoutMessageInput[] | MessageReactionUncheckedCreateWithoutMessageInput[]
    connectOrCreate?: MessageReactionCreateOrConnectWithoutMessageInput | MessageReactionCreateOrConnectWithoutMessageInput[]
    upsert?: MessageReactionUpsertWithWhereUniqueWithoutMessageInput | MessageReactionUpsertWithWhereUniqueWithoutMessageInput[]
    createMany?: MessageReactionCreateManyMessageInputEnvelope
    set?: MessageReactionWhereUniqueInput | MessageReactionWhereUniqueInput[]
    disconnect?: MessageReactionWhereUniqueInput | MessageReactionWhereUniqueInput[]
    delete?: MessageReactionWhereUniqueInput | MessageReactionWhereUniqueInput[]
    connect?: MessageReactionWhereUniqueInput | MessageReactionWhereUniqueInput[]
    update?: MessageReactionUpdateWithWhereUniqueWithoutMessageInput | MessageReactionUpdateWithWhereUniqueWithoutMessageInput[]
    updateMany?: MessageReactionUpdateManyWithWhereWithoutMessageInput | MessageReactionUpdateManyWithWhereWithoutMessageInput[]
    deleteMany?: MessageReactionScalarWhereInput | MessageReactionScalarWhereInput[]
  }

  export type MessageStatusRecordUpdateManyWithoutMessageNestedInput = {
    create?: XOR<MessageStatusRecordCreateWithoutMessageInput, MessageStatusRecordUncheckedCreateWithoutMessageInput> | MessageStatusRecordCreateWithoutMessageInput[] | MessageStatusRecordUncheckedCreateWithoutMessageInput[]
    connectOrCreate?: MessageStatusRecordCreateOrConnectWithoutMessageInput | MessageStatusRecordCreateOrConnectWithoutMessageInput[]
    upsert?: MessageStatusRecordUpsertWithWhereUniqueWithoutMessageInput | MessageStatusRecordUpsertWithWhereUniqueWithoutMessageInput[]
    createMany?: MessageStatusRecordCreateManyMessageInputEnvelope
    set?: MessageStatusRecordWhereUniqueInput | MessageStatusRecordWhereUniqueInput[]
    disconnect?: MessageStatusRecordWhereUniqueInput | MessageStatusRecordWhereUniqueInput[]
    delete?: MessageStatusRecordWhereUniqueInput | MessageStatusRecordWhereUniqueInput[]
    connect?: MessageStatusRecordWhereUniqueInput | MessageStatusRecordWhereUniqueInput[]
    update?: MessageStatusRecordUpdateWithWhereUniqueWithoutMessageInput | MessageStatusRecordUpdateWithWhereUniqueWithoutMessageInput[]
    updateMany?: MessageStatusRecordUpdateManyWithWhereWithoutMessageInput | MessageStatusRecordUpdateManyWithWhereWithoutMessageInput[]
    deleteMany?: MessageStatusRecordScalarWhereInput | MessageStatusRecordScalarWhereInput[]
  }

  export type MessageUncheckedUpdateManyWithoutReplyToNestedInput = {
    create?: XOR<MessageCreateWithoutReplyToInput, MessageUncheckedCreateWithoutReplyToInput> | MessageCreateWithoutReplyToInput[] | MessageUncheckedCreateWithoutReplyToInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutReplyToInput | MessageCreateOrConnectWithoutReplyToInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutReplyToInput | MessageUpsertWithWhereUniqueWithoutReplyToInput[]
    createMany?: MessageCreateManyReplyToInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutReplyToInput | MessageUpdateWithWhereUniqueWithoutReplyToInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutReplyToInput | MessageUpdateManyWithWhereWithoutReplyToInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type MessageReactionUncheckedUpdateManyWithoutMessageNestedInput = {
    create?: XOR<MessageReactionCreateWithoutMessageInput, MessageReactionUncheckedCreateWithoutMessageInput> | MessageReactionCreateWithoutMessageInput[] | MessageReactionUncheckedCreateWithoutMessageInput[]
    connectOrCreate?: MessageReactionCreateOrConnectWithoutMessageInput | MessageReactionCreateOrConnectWithoutMessageInput[]
    upsert?: MessageReactionUpsertWithWhereUniqueWithoutMessageInput | MessageReactionUpsertWithWhereUniqueWithoutMessageInput[]
    createMany?: MessageReactionCreateManyMessageInputEnvelope
    set?: MessageReactionWhereUniqueInput | MessageReactionWhereUniqueInput[]
    disconnect?: MessageReactionWhereUniqueInput | MessageReactionWhereUniqueInput[]
    delete?: MessageReactionWhereUniqueInput | MessageReactionWhereUniqueInput[]
    connect?: MessageReactionWhereUniqueInput | MessageReactionWhereUniqueInput[]
    update?: MessageReactionUpdateWithWhereUniqueWithoutMessageInput | MessageReactionUpdateWithWhereUniqueWithoutMessageInput[]
    updateMany?: MessageReactionUpdateManyWithWhereWithoutMessageInput | MessageReactionUpdateManyWithWhereWithoutMessageInput[]
    deleteMany?: MessageReactionScalarWhereInput | MessageReactionScalarWhereInput[]
  }

  export type MessageStatusRecordUncheckedUpdateManyWithoutMessageNestedInput = {
    create?: XOR<MessageStatusRecordCreateWithoutMessageInput, MessageStatusRecordUncheckedCreateWithoutMessageInput> | MessageStatusRecordCreateWithoutMessageInput[] | MessageStatusRecordUncheckedCreateWithoutMessageInput[]
    connectOrCreate?: MessageStatusRecordCreateOrConnectWithoutMessageInput | MessageStatusRecordCreateOrConnectWithoutMessageInput[]
    upsert?: MessageStatusRecordUpsertWithWhereUniqueWithoutMessageInput | MessageStatusRecordUpsertWithWhereUniqueWithoutMessageInput[]
    createMany?: MessageStatusRecordCreateManyMessageInputEnvelope
    set?: MessageStatusRecordWhereUniqueInput | MessageStatusRecordWhereUniqueInput[]
    disconnect?: MessageStatusRecordWhereUniqueInput | MessageStatusRecordWhereUniqueInput[]
    delete?: MessageStatusRecordWhereUniqueInput | MessageStatusRecordWhereUniqueInput[]
    connect?: MessageStatusRecordWhereUniqueInput | MessageStatusRecordWhereUniqueInput[]
    update?: MessageStatusRecordUpdateWithWhereUniqueWithoutMessageInput | MessageStatusRecordUpdateWithWhereUniqueWithoutMessageInput[]
    updateMany?: MessageStatusRecordUpdateManyWithWhereWithoutMessageInput | MessageStatusRecordUpdateManyWithWhereWithoutMessageInput[]
    deleteMany?: MessageStatusRecordScalarWhereInput | MessageStatusRecordScalarWhereInput[]
  }

  export type MessageCreateNestedOneWithoutStatusInput = {
    create?: XOR<MessageCreateWithoutStatusInput, MessageUncheckedCreateWithoutStatusInput>
    connectOrCreate?: MessageCreateOrConnectWithoutStatusInput
    connect?: MessageWhereUniqueInput
  }

  export type EnumMessageStatusTypeFieldUpdateOperationsInput = {
    set?: $Enums.MessageStatusType
  }

  export type MessageUpdateOneRequiredWithoutStatusNestedInput = {
    create?: XOR<MessageCreateWithoutStatusInput, MessageUncheckedCreateWithoutStatusInput>
    connectOrCreate?: MessageCreateOrConnectWithoutStatusInput
    upsert?: MessageUpsertWithoutStatusInput
    connect?: MessageWhereUniqueInput
    update?: XOR<XOR<MessageUpdateToOneWithWhereWithoutStatusInput, MessageUpdateWithoutStatusInput>, MessageUncheckedUpdateWithoutStatusInput>
  }

  export type MessageCreateNestedOneWithoutReactionsInput = {
    create?: XOR<MessageCreateWithoutReactionsInput, MessageUncheckedCreateWithoutReactionsInput>
    connectOrCreate?: MessageCreateOrConnectWithoutReactionsInput
    connect?: MessageWhereUniqueInput
  }

  export type MessageUpdateOneRequiredWithoutReactionsNestedInput = {
    create?: XOR<MessageCreateWithoutReactionsInput, MessageUncheckedCreateWithoutReactionsInput>
    connectOrCreate?: MessageCreateOrConnectWithoutReactionsInput
    upsert?: MessageUpsertWithoutReactionsInput
    connect?: MessageWhereUniqueInput
    update?: XOR<XOR<MessageUpdateToOneWithWhereWithoutReactionsInput, MessageUpdateWithoutReactionsInput>, MessageUncheckedUpdateWithoutReactionsInput>
  }

  export type NotificationSettingsCreatepushTokensInput = {
    set: string[]
  }

  export type NotificationSettingsUpdatepushTokensInput = {
    set?: string[]
    push?: string | string[]
  }

  export type MessageThreadCreateparticipantsInput = {
    set: string[]
  }

  export type MessageThreadUpdateparticipantsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumNotificationTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | EnumNotificationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationTypeFilter<$PrismaModel> | $Enums.NotificationType
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
    isSet?: boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
    isSet?: boolean
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumNotificationTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | EnumNotificationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationTypeWithAggregatesFilter<$PrismaModel> | $Enums.NotificationType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNotificationTypeFilter<$PrismaModel>
    _max?: NestedEnumNotificationTypeFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
    isSet?: boolean
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    isSet?: boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type NestedEnumConversationTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ConversationType | EnumConversationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ConversationType[] | ListEnumConversationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConversationType[] | ListEnumConversationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumConversationTypeFilter<$PrismaModel> | $Enums.ConversationType
  }

  export type NestedEnumConversationTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ConversationType | EnumConversationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ConversationType[] | ListEnumConversationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConversationType[] | ListEnumConversationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumConversationTypeWithAggregatesFilter<$PrismaModel> | $Enums.ConversationType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumConversationTypeFilter<$PrismaModel>
    _max?: NestedEnumConversationTypeFilter<$PrismaModel>
  }

  export type NestedEnumMessageTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.MessageType | EnumMessageTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MessageType[] | ListEnumMessageTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.MessageType[] | ListEnumMessageTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumMessageTypeFilter<$PrismaModel> | $Enums.MessageType
  }

  export type NestedEnumMessageTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MessageType | EnumMessageTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MessageType[] | ListEnumMessageTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.MessageType[] | ListEnumMessageTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumMessageTypeWithAggregatesFilter<$PrismaModel> | $Enums.MessageType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMessageTypeFilter<$PrismaModel>
    _max?: NestedEnumMessageTypeFilter<$PrismaModel>
  }

  export type NestedEnumMessageStatusTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.MessageStatusType | EnumMessageStatusTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MessageStatusType[] | ListEnumMessageStatusTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.MessageStatusType[] | ListEnumMessageStatusTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumMessageStatusTypeFilter<$PrismaModel> | $Enums.MessageStatusType
  }

  export type NestedEnumMessageStatusTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MessageStatusType | EnumMessageStatusTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MessageStatusType[] | ListEnumMessageStatusTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.MessageStatusType[] | ListEnumMessageStatusTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumMessageStatusTypeWithAggregatesFilter<$PrismaModel> | $Enums.MessageStatusType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMessageStatusTypeFilter<$PrismaModel>
    _max?: NestedEnumMessageStatusTypeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type MessageCreateWithoutConversationInput = {
    id?: string
    senderId: string
    content: string
    type?: $Enums.MessageType
    metadata?: InputJsonValue | null
    isEdited?: boolean
    editedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    replyTo?: MessageCreateNestedOneWithoutRepliesInput
    replies?: MessageCreateNestedManyWithoutReplyToInput
    reactions?: MessageReactionCreateNestedManyWithoutMessageInput
    status?: MessageStatusRecordCreateNestedManyWithoutMessageInput
  }

  export type MessageUncheckedCreateWithoutConversationInput = {
    id?: string
    senderId: string
    content: string
    type?: $Enums.MessageType
    metadata?: InputJsonValue | null
    replyToId?: string | null
    isEdited?: boolean
    editedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    replies?: MessageUncheckedCreateNestedManyWithoutReplyToInput
    reactions?: MessageReactionUncheckedCreateNestedManyWithoutMessageInput
    status?: MessageStatusRecordUncheckedCreateNestedManyWithoutMessageInput
  }

  export type MessageCreateOrConnectWithoutConversationInput = {
    where: MessageWhereUniqueInput
    create: XOR<MessageCreateWithoutConversationInput, MessageUncheckedCreateWithoutConversationInput>
  }

  export type MessageCreateManyConversationInputEnvelope = {
    data: MessageCreateManyConversationInput | MessageCreateManyConversationInput[]
  }

  export type MessageUpsertWithWhereUniqueWithoutConversationInput = {
    where: MessageWhereUniqueInput
    update: XOR<MessageUpdateWithoutConversationInput, MessageUncheckedUpdateWithoutConversationInput>
    create: XOR<MessageCreateWithoutConversationInput, MessageUncheckedCreateWithoutConversationInput>
  }

  export type MessageUpdateWithWhereUniqueWithoutConversationInput = {
    where: MessageWhereUniqueInput
    data: XOR<MessageUpdateWithoutConversationInput, MessageUncheckedUpdateWithoutConversationInput>
  }

  export type MessageUpdateManyWithWhereWithoutConversationInput = {
    where: MessageScalarWhereInput
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyWithoutConversationInput>
  }

  export type MessageScalarWhereInput = {
    AND?: MessageScalarWhereInput | MessageScalarWhereInput[]
    OR?: MessageScalarWhereInput[]
    NOT?: MessageScalarWhereInput | MessageScalarWhereInput[]
    id?: StringFilter<"Message"> | string
    conversationId?: StringFilter<"Message"> | string
    senderId?: StringFilter<"Message"> | string
    content?: StringFilter<"Message"> | string
    type?: EnumMessageTypeFilter<"Message"> | $Enums.MessageType
    metadata?: JsonNullableFilter<"Message">
    replyToId?: StringNullableFilter<"Message"> | string | null
    isEdited?: BoolFilter<"Message"> | boolean
    editedAt?: DateTimeNullableFilter<"Message"> | Date | string | null
    createdAt?: DateTimeFilter<"Message"> | Date | string
    updatedAt?: DateTimeFilter<"Message"> | Date | string
  }

  export type ConversationCreateWithoutMessagesInput = {
    id?: string
    type?: $Enums.ConversationType
    participants?: ConversationCreateparticipantsInput | string[]
    name?: string | null
    image?: string | null
    createdBy: string
    lastMessage?: InputJsonValue | null
    lastActivity?: Date | string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ConversationUncheckedCreateWithoutMessagesInput = {
    id?: string
    type?: $Enums.ConversationType
    participants?: ConversationCreateparticipantsInput | string[]
    name?: string | null
    image?: string | null
    createdBy: string
    lastMessage?: InputJsonValue | null
    lastActivity?: Date | string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ConversationCreateOrConnectWithoutMessagesInput = {
    where: ConversationWhereUniqueInput
    create: XOR<ConversationCreateWithoutMessagesInput, ConversationUncheckedCreateWithoutMessagesInput>
  }

  export type MessageCreateWithoutRepliesInput = {
    id?: string
    senderId: string
    content: string
    type?: $Enums.MessageType
    metadata?: InputJsonValue | null
    isEdited?: boolean
    editedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    conversation: ConversationCreateNestedOneWithoutMessagesInput
    replyTo?: MessageCreateNestedOneWithoutRepliesInput
    reactions?: MessageReactionCreateNestedManyWithoutMessageInput
    status?: MessageStatusRecordCreateNestedManyWithoutMessageInput
  }

  export type MessageUncheckedCreateWithoutRepliesInput = {
    id?: string
    conversationId: string
    senderId: string
    content: string
    type?: $Enums.MessageType
    metadata?: InputJsonValue | null
    replyToId?: string | null
    isEdited?: boolean
    editedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    reactions?: MessageReactionUncheckedCreateNestedManyWithoutMessageInput
    status?: MessageStatusRecordUncheckedCreateNestedManyWithoutMessageInput
  }

  export type MessageCreateOrConnectWithoutRepliesInput = {
    where: MessageWhereUniqueInput
    create: XOR<MessageCreateWithoutRepliesInput, MessageUncheckedCreateWithoutRepliesInput>
  }

  export type MessageCreateWithoutReplyToInput = {
    id?: string
    senderId: string
    content: string
    type?: $Enums.MessageType
    metadata?: InputJsonValue | null
    isEdited?: boolean
    editedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    conversation: ConversationCreateNestedOneWithoutMessagesInput
    replies?: MessageCreateNestedManyWithoutReplyToInput
    reactions?: MessageReactionCreateNestedManyWithoutMessageInput
    status?: MessageStatusRecordCreateNestedManyWithoutMessageInput
  }

  export type MessageUncheckedCreateWithoutReplyToInput = {
    id?: string
    conversationId: string
    senderId: string
    content: string
    type?: $Enums.MessageType
    metadata?: InputJsonValue | null
    isEdited?: boolean
    editedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    replies?: MessageUncheckedCreateNestedManyWithoutReplyToInput
    reactions?: MessageReactionUncheckedCreateNestedManyWithoutMessageInput
    status?: MessageStatusRecordUncheckedCreateNestedManyWithoutMessageInput
  }

  export type MessageCreateOrConnectWithoutReplyToInput = {
    where: MessageWhereUniqueInput
    create: XOR<MessageCreateWithoutReplyToInput, MessageUncheckedCreateWithoutReplyToInput>
  }

  export type MessageCreateManyReplyToInputEnvelope = {
    data: MessageCreateManyReplyToInput | MessageCreateManyReplyToInput[]
  }

  export type MessageReactionCreateWithoutMessageInput = {
    id?: string
    userId: string
    emoji: string
    createdAt?: Date | string
  }

  export type MessageReactionUncheckedCreateWithoutMessageInput = {
    id?: string
    userId: string
    emoji: string
    createdAt?: Date | string
  }

  export type MessageReactionCreateOrConnectWithoutMessageInput = {
    where: MessageReactionWhereUniqueInput
    create: XOR<MessageReactionCreateWithoutMessageInput, MessageReactionUncheckedCreateWithoutMessageInput>
  }

  export type MessageReactionCreateManyMessageInputEnvelope = {
    data: MessageReactionCreateManyMessageInput | MessageReactionCreateManyMessageInput[]
  }

  export type MessageStatusRecordCreateWithoutMessageInput = {
    id?: string
    userId: string
    status: $Enums.MessageStatusType
    timestamp?: Date | string
  }

  export type MessageStatusRecordUncheckedCreateWithoutMessageInput = {
    id?: string
    userId: string
    status: $Enums.MessageStatusType
    timestamp?: Date | string
  }

  export type MessageStatusRecordCreateOrConnectWithoutMessageInput = {
    where: MessageStatusRecordWhereUniqueInput
    create: XOR<MessageStatusRecordCreateWithoutMessageInput, MessageStatusRecordUncheckedCreateWithoutMessageInput>
  }

  export type MessageStatusRecordCreateManyMessageInputEnvelope = {
    data: MessageStatusRecordCreateManyMessageInput | MessageStatusRecordCreateManyMessageInput[]
  }

  export type ConversationUpsertWithoutMessagesInput = {
    update: XOR<ConversationUpdateWithoutMessagesInput, ConversationUncheckedUpdateWithoutMessagesInput>
    create: XOR<ConversationCreateWithoutMessagesInput, ConversationUncheckedCreateWithoutMessagesInput>
    where?: ConversationWhereInput
  }

  export type ConversationUpdateToOneWithWhereWithoutMessagesInput = {
    where?: ConversationWhereInput
    data: XOR<ConversationUpdateWithoutMessagesInput, ConversationUncheckedUpdateWithoutMessagesInput>
  }

  export type ConversationUpdateWithoutMessagesInput = {
    type?: EnumConversationTypeFieldUpdateOperationsInput | $Enums.ConversationType
    participants?: ConversationUpdateparticipantsInput | string[]
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: StringFieldUpdateOperationsInput | string
    lastMessage?: InputJsonValue | InputJsonValue | null
    lastActivity?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConversationUncheckedUpdateWithoutMessagesInput = {
    type?: EnumConversationTypeFieldUpdateOperationsInput | $Enums.ConversationType
    participants?: ConversationUpdateparticipantsInput | string[]
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: StringFieldUpdateOperationsInput | string
    lastMessage?: InputJsonValue | InputJsonValue | null
    lastActivity?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUpsertWithoutRepliesInput = {
    update: XOR<MessageUpdateWithoutRepliesInput, MessageUncheckedUpdateWithoutRepliesInput>
    create: XOR<MessageCreateWithoutRepliesInput, MessageUncheckedCreateWithoutRepliesInput>
    where?: MessageWhereInput
  }

  export type MessageUpdateToOneWithWhereWithoutRepliesInput = {
    where?: MessageWhereInput
    data: XOR<MessageUpdateWithoutRepliesInput, MessageUncheckedUpdateWithoutRepliesInput>
  }

  export type MessageUpdateWithoutRepliesInput = {
    senderId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    type?: EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType
    metadata?: InputJsonValue | InputJsonValue | null
    isEdited?: BoolFieldUpdateOperationsInput | boolean
    editedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversation?: ConversationUpdateOneRequiredWithoutMessagesNestedInput
    replyTo?: MessageUpdateOneWithoutRepliesNestedInput
    reactions?: MessageReactionUpdateManyWithoutMessageNestedInput
    status?: MessageStatusRecordUpdateManyWithoutMessageNestedInput
  }

  export type MessageUncheckedUpdateWithoutRepliesInput = {
    conversationId?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    type?: EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType
    metadata?: InputJsonValue | InputJsonValue | null
    replyToId?: NullableStringFieldUpdateOperationsInput | string | null
    isEdited?: BoolFieldUpdateOperationsInput | boolean
    editedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reactions?: MessageReactionUncheckedUpdateManyWithoutMessageNestedInput
    status?: MessageStatusRecordUncheckedUpdateManyWithoutMessageNestedInput
  }

  export type MessageUpsertWithWhereUniqueWithoutReplyToInput = {
    where: MessageWhereUniqueInput
    update: XOR<MessageUpdateWithoutReplyToInput, MessageUncheckedUpdateWithoutReplyToInput>
    create: XOR<MessageCreateWithoutReplyToInput, MessageUncheckedCreateWithoutReplyToInput>
  }

  export type MessageUpdateWithWhereUniqueWithoutReplyToInput = {
    where: MessageWhereUniqueInput
    data: XOR<MessageUpdateWithoutReplyToInput, MessageUncheckedUpdateWithoutReplyToInput>
  }

  export type MessageUpdateManyWithWhereWithoutReplyToInput = {
    where: MessageScalarWhereInput
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyWithoutReplyToInput>
  }

  export type MessageReactionUpsertWithWhereUniqueWithoutMessageInput = {
    where: MessageReactionWhereUniqueInput
    update: XOR<MessageReactionUpdateWithoutMessageInput, MessageReactionUncheckedUpdateWithoutMessageInput>
    create: XOR<MessageReactionCreateWithoutMessageInput, MessageReactionUncheckedCreateWithoutMessageInput>
  }

  export type MessageReactionUpdateWithWhereUniqueWithoutMessageInput = {
    where: MessageReactionWhereUniqueInput
    data: XOR<MessageReactionUpdateWithoutMessageInput, MessageReactionUncheckedUpdateWithoutMessageInput>
  }

  export type MessageReactionUpdateManyWithWhereWithoutMessageInput = {
    where: MessageReactionScalarWhereInput
    data: XOR<MessageReactionUpdateManyMutationInput, MessageReactionUncheckedUpdateManyWithoutMessageInput>
  }

  export type MessageReactionScalarWhereInput = {
    AND?: MessageReactionScalarWhereInput | MessageReactionScalarWhereInput[]
    OR?: MessageReactionScalarWhereInput[]
    NOT?: MessageReactionScalarWhereInput | MessageReactionScalarWhereInput[]
    id?: StringFilter<"MessageReaction"> | string
    messageId?: StringFilter<"MessageReaction"> | string
    userId?: StringFilter<"MessageReaction"> | string
    emoji?: StringFilter<"MessageReaction"> | string
    createdAt?: DateTimeFilter<"MessageReaction"> | Date | string
  }

  export type MessageStatusRecordUpsertWithWhereUniqueWithoutMessageInput = {
    where: MessageStatusRecordWhereUniqueInput
    update: XOR<MessageStatusRecordUpdateWithoutMessageInput, MessageStatusRecordUncheckedUpdateWithoutMessageInput>
    create: XOR<MessageStatusRecordCreateWithoutMessageInput, MessageStatusRecordUncheckedCreateWithoutMessageInput>
  }

  export type MessageStatusRecordUpdateWithWhereUniqueWithoutMessageInput = {
    where: MessageStatusRecordWhereUniqueInput
    data: XOR<MessageStatusRecordUpdateWithoutMessageInput, MessageStatusRecordUncheckedUpdateWithoutMessageInput>
  }

  export type MessageStatusRecordUpdateManyWithWhereWithoutMessageInput = {
    where: MessageStatusRecordScalarWhereInput
    data: XOR<MessageStatusRecordUpdateManyMutationInput, MessageStatusRecordUncheckedUpdateManyWithoutMessageInput>
  }

  export type MessageStatusRecordScalarWhereInput = {
    AND?: MessageStatusRecordScalarWhereInput | MessageStatusRecordScalarWhereInput[]
    OR?: MessageStatusRecordScalarWhereInput[]
    NOT?: MessageStatusRecordScalarWhereInput | MessageStatusRecordScalarWhereInput[]
    id?: StringFilter<"MessageStatusRecord"> | string
    messageId?: StringFilter<"MessageStatusRecord"> | string
    userId?: StringFilter<"MessageStatusRecord"> | string
    status?: EnumMessageStatusTypeFilter<"MessageStatusRecord"> | $Enums.MessageStatusType
    timestamp?: DateTimeFilter<"MessageStatusRecord"> | Date | string
  }

  export type MessageCreateWithoutStatusInput = {
    id?: string
    senderId: string
    content: string
    type?: $Enums.MessageType
    metadata?: InputJsonValue | null
    isEdited?: boolean
    editedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    conversation: ConversationCreateNestedOneWithoutMessagesInput
    replyTo?: MessageCreateNestedOneWithoutRepliesInput
    replies?: MessageCreateNestedManyWithoutReplyToInput
    reactions?: MessageReactionCreateNestedManyWithoutMessageInput
  }

  export type MessageUncheckedCreateWithoutStatusInput = {
    id?: string
    conversationId: string
    senderId: string
    content: string
    type?: $Enums.MessageType
    metadata?: InputJsonValue | null
    replyToId?: string | null
    isEdited?: boolean
    editedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    replies?: MessageUncheckedCreateNestedManyWithoutReplyToInput
    reactions?: MessageReactionUncheckedCreateNestedManyWithoutMessageInput
  }

  export type MessageCreateOrConnectWithoutStatusInput = {
    where: MessageWhereUniqueInput
    create: XOR<MessageCreateWithoutStatusInput, MessageUncheckedCreateWithoutStatusInput>
  }

  export type MessageUpsertWithoutStatusInput = {
    update: XOR<MessageUpdateWithoutStatusInput, MessageUncheckedUpdateWithoutStatusInput>
    create: XOR<MessageCreateWithoutStatusInput, MessageUncheckedCreateWithoutStatusInput>
    where?: MessageWhereInput
  }

  export type MessageUpdateToOneWithWhereWithoutStatusInput = {
    where?: MessageWhereInput
    data: XOR<MessageUpdateWithoutStatusInput, MessageUncheckedUpdateWithoutStatusInput>
  }

  export type MessageUpdateWithoutStatusInput = {
    senderId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    type?: EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType
    metadata?: InputJsonValue | InputJsonValue | null
    isEdited?: BoolFieldUpdateOperationsInput | boolean
    editedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversation?: ConversationUpdateOneRequiredWithoutMessagesNestedInput
    replyTo?: MessageUpdateOneWithoutRepliesNestedInput
    replies?: MessageUpdateManyWithoutReplyToNestedInput
    reactions?: MessageReactionUpdateManyWithoutMessageNestedInput
  }

  export type MessageUncheckedUpdateWithoutStatusInput = {
    conversationId?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    type?: EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType
    metadata?: InputJsonValue | InputJsonValue | null
    replyToId?: NullableStringFieldUpdateOperationsInput | string | null
    isEdited?: BoolFieldUpdateOperationsInput | boolean
    editedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    replies?: MessageUncheckedUpdateManyWithoutReplyToNestedInput
    reactions?: MessageReactionUncheckedUpdateManyWithoutMessageNestedInput
  }

  export type MessageCreateWithoutReactionsInput = {
    id?: string
    senderId: string
    content: string
    type?: $Enums.MessageType
    metadata?: InputJsonValue | null
    isEdited?: boolean
    editedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    conversation: ConversationCreateNestedOneWithoutMessagesInput
    replyTo?: MessageCreateNestedOneWithoutRepliesInput
    replies?: MessageCreateNestedManyWithoutReplyToInput
    status?: MessageStatusRecordCreateNestedManyWithoutMessageInput
  }

  export type MessageUncheckedCreateWithoutReactionsInput = {
    id?: string
    conversationId: string
    senderId: string
    content: string
    type?: $Enums.MessageType
    metadata?: InputJsonValue | null
    replyToId?: string | null
    isEdited?: boolean
    editedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    replies?: MessageUncheckedCreateNestedManyWithoutReplyToInput
    status?: MessageStatusRecordUncheckedCreateNestedManyWithoutMessageInput
  }

  export type MessageCreateOrConnectWithoutReactionsInput = {
    where: MessageWhereUniqueInput
    create: XOR<MessageCreateWithoutReactionsInput, MessageUncheckedCreateWithoutReactionsInput>
  }

  export type MessageUpsertWithoutReactionsInput = {
    update: XOR<MessageUpdateWithoutReactionsInput, MessageUncheckedUpdateWithoutReactionsInput>
    create: XOR<MessageCreateWithoutReactionsInput, MessageUncheckedCreateWithoutReactionsInput>
    where?: MessageWhereInput
  }

  export type MessageUpdateToOneWithWhereWithoutReactionsInput = {
    where?: MessageWhereInput
    data: XOR<MessageUpdateWithoutReactionsInput, MessageUncheckedUpdateWithoutReactionsInput>
  }

  export type MessageUpdateWithoutReactionsInput = {
    senderId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    type?: EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType
    metadata?: InputJsonValue | InputJsonValue | null
    isEdited?: BoolFieldUpdateOperationsInput | boolean
    editedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversation?: ConversationUpdateOneRequiredWithoutMessagesNestedInput
    replyTo?: MessageUpdateOneWithoutRepliesNestedInput
    replies?: MessageUpdateManyWithoutReplyToNestedInput
    status?: MessageStatusRecordUpdateManyWithoutMessageNestedInput
  }

  export type MessageUncheckedUpdateWithoutReactionsInput = {
    conversationId?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    type?: EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType
    metadata?: InputJsonValue | InputJsonValue | null
    replyToId?: NullableStringFieldUpdateOperationsInput | string | null
    isEdited?: BoolFieldUpdateOperationsInput | boolean
    editedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    replies?: MessageUncheckedUpdateManyWithoutReplyToNestedInput
    status?: MessageStatusRecordUncheckedUpdateManyWithoutMessageNestedInput
  }

  export type MessageCreateManyConversationInput = {
    id?: string
    senderId: string
    content: string
    type?: $Enums.MessageType
    metadata?: InputJsonValue | null
    replyToId?: string | null
    isEdited?: boolean
    editedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MessageUpdateWithoutConversationInput = {
    senderId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    type?: EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType
    metadata?: InputJsonValue | InputJsonValue | null
    isEdited?: BoolFieldUpdateOperationsInput | boolean
    editedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    replyTo?: MessageUpdateOneWithoutRepliesNestedInput
    replies?: MessageUpdateManyWithoutReplyToNestedInput
    reactions?: MessageReactionUpdateManyWithoutMessageNestedInput
    status?: MessageStatusRecordUpdateManyWithoutMessageNestedInput
  }

  export type MessageUncheckedUpdateWithoutConversationInput = {
    senderId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    type?: EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType
    metadata?: InputJsonValue | InputJsonValue | null
    replyToId?: NullableStringFieldUpdateOperationsInput | string | null
    isEdited?: BoolFieldUpdateOperationsInput | boolean
    editedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    replies?: MessageUncheckedUpdateManyWithoutReplyToNestedInput
    reactions?: MessageReactionUncheckedUpdateManyWithoutMessageNestedInput
    status?: MessageStatusRecordUncheckedUpdateManyWithoutMessageNestedInput
  }

  export type MessageUncheckedUpdateManyWithoutConversationInput = {
    senderId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    type?: EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType
    metadata?: InputJsonValue | InputJsonValue | null
    replyToId?: NullableStringFieldUpdateOperationsInput | string | null
    isEdited?: BoolFieldUpdateOperationsInput | boolean
    editedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageCreateManyReplyToInput = {
    id?: string
    conversationId: string
    senderId: string
    content: string
    type?: $Enums.MessageType
    metadata?: InputJsonValue | null
    isEdited?: boolean
    editedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MessageReactionCreateManyMessageInput = {
    id?: string
    userId: string
    emoji: string
    createdAt?: Date | string
  }

  export type MessageStatusRecordCreateManyMessageInput = {
    id?: string
    userId: string
    status: $Enums.MessageStatusType
    timestamp?: Date | string
  }

  export type MessageUpdateWithoutReplyToInput = {
    senderId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    type?: EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType
    metadata?: InputJsonValue | InputJsonValue | null
    isEdited?: BoolFieldUpdateOperationsInput | boolean
    editedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversation?: ConversationUpdateOneRequiredWithoutMessagesNestedInput
    replies?: MessageUpdateManyWithoutReplyToNestedInput
    reactions?: MessageReactionUpdateManyWithoutMessageNestedInput
    status?: MessageStatusRecordUpdateManyWithoutMessageNestedInput
  }

  export type MessageUncheckedUpdateWithoutReplyToInput = {
    conversationId?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    type?: EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType
    metadata?: InputJsonValue | InputJsonValue | null
    isEdited?: BoolFieldUpdateOperationsInput | boolean
    editedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    replies?: MessageUncheckedUpdateManyWithoutReplyToNestedInput
    reactions?: MessageReactionUncheckedUpdateManyWithoutMessageNestedInput
    status?: MessageStatusRecordUncheckedUpdateManyWithoutMessageNestedInput
  }

  export type MessageUncheckedUpdateManyWithoutReplyToInput = {
    conversationId?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    type?: EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType
    metadata?: InputJsonValue | InputJsonValue | null
    isEdited?: BoolFieldUpdateOperationsInput | boolean
    editedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageReactionUpdateWithoutMessageInput = {
    userId?: StringFieldUpdateOperationsInput | string
    emoji?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageReactionUncheckedUpdateWithoutMessageInput = {
    userId?: StringFieldUpdateOperationsInput | string
    emoji?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageReactionUncheckedUpdateManyWithoutMessageInput = {
    userId?: StringFieldUpdateOperationsInput | string
    emoji?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageStatusRecordUpdateWithoutMessageInput = {
    userId?: StringFieldUpdateOperationsInput | string
    status?: EnumMessageStatusTypeFieldUpdateOperationsInput | $Enums.MessageStatusType
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageStatusRecordUncheckedUpdateWithoutMessageInput = {
    userId?: StringFieldUpdateOperationsInput | string
    status?: EnumMessageStatusTypeFieldUpdateOperationsInput | $Enums.MessageStatusType
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageStatusRecordUncheckedUpdateManyWithoutMessageInput = {
    userId?: StringFieldUpdateOperationsInput | string
    status?: EnumMessageStatusTypeFieldUpdateOperationsInput | $Enums.MessageStatusType
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}