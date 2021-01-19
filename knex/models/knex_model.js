"use strict";

import _ from 'lodash';

export default class KnexModel {
  constructor(args) {
    // TODO: Define attributes and do attribute validation
    this.params = args;
    this.defineAccessors();
    this.validateModelDefinition();
  }

  /** Ensures that all required functions are defined */
  validateModelDefinition() {
    if(_.isNil(this.constructor.tableName())) {
      throw new Error('Expected a table name to be defined in the implementing model');
    }
  }

  /** Adds getters and setters to the class dynamically */
  defineAccessors() { // TODO: Unit test this
    const params = this.params;
    _.each(this.constructor.attributes(), (attribute) => {
      Object.defineProperty(this, attribute, {
        get() { return _.get(params, attributeundefined) },
        set(v) { params[attribute] = v }
      });
    });
  }

  static tableName() {
    return undefined
  }

  static attributes(overrides) {
    return _.merge(overrides, []);
  }

  /**
   * Override this function to define model attributes that have a unique
   * constraint in the db and can be merged against on an upsert
   * */
  static uniqueAttributes(overrides) {
    return _.merge(overrides, ['uuid']);
  }

  static mergeableAttributes() {
    return _.reject(this.attributes(), this.uniqueAttributes());
  }

  async reload() {
    throw new Error('Not Implemented');
  }

  async upsert(database) {
    return database(this.constructor.tableName())
      .insert(this.params)
      .onConflict(this.prototype.mergeableAttributes())
      .merge(); // TODO define mergable attributes
      // TODO: Debug query
  }

  static async bulk_import(database, models) {
    const data = _.map(
      models,
      (model) => { return (model instanceof KnexModel) ? model.params : model; }
    );
    console.dir(database);
    var query = database(this.tableName())
      .insert(data)
    const uniqueAttributes = this.uniqueAttributes();
    if(!_.isEmpty(uniqueAttributes)) {
      query = query.onConflict(this.mergeableAttributes())
        .merge(); // TODO define mergable attributes
    }
    return query;
    // TODO: Debug query
  }
}