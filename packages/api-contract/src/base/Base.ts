// Copyright 2017-2020 @polkadot/api authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ApiTypes, DecorateMethod, SubmittableModuleExtrinsics } from '@polkadot/api/types';
import { AnyJson, Registry } from '@polkadot/types/types';
import { ApiObject } from '../types';

import { assert } from '@polkadot/util';
import Abi from '../Abi';

export default abstract class Base<ApiType extends ApiTypes> {
  public readonly abi: Abi;

  public readonly api: ApiObject<ApiType>;

  public readonly registry: Registry;

  protected readonly _decorateMethod: DecorateMethod<ApiType>;

  constructor (api: ApiObject<ApiType>, abi: AnyJson | Abi, decorateMethod: DecorateMethod<ApiType>) {
    this.abi = abi instanceof Abi
      ? abi
      : new Abi(api.registry, abi);
    this.api = api;
    this.registry = api.registry;
    this._decorateMethod = decorateMethod;

    assert(this.api.rx.tx.contracts && this.api.rx.tx.contracts.putCode, 'You need to connect to a node with the contracts module, the metadata does not enable api.tx.contracts on this instance');
  }

  protected get _apiContracts (): SubmittableModuleExtrinsics<'rxjs'> {
    return this.api.rx.tx.contracts;
  }
}