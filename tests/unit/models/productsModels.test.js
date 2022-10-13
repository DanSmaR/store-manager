const { expect } = require("chai");
const sinon = require('sinon');
const connection = require("../../../src/models/db/connection");
const { resultTypes, resultMsg } = require("../../../src/utils/errorResults");
const { allProductsResponse } = require("../../../__tests__/_dataMock");
const { productsModels } = require('./../../../src/models');

describe('Products Model Layer Unit Testing', function () {
  afterEach(sinon.restore);

  describe('testing the products query in database', function () {
    it('should return a list of products', async function () {
      sinon.stub(connection, 'execute').resolves([allProductsResponse]);

      const { type, message } = await productsModels.listAll();
      expect(type).to.equal(null);
      expect(message).to.deep.equal(allProductsResponse);
    });

    it('should return a error resṕonse in case of error in database', async function () {
      sinon.stub(connection, 'execute').throws('message', [resultMsg.databaseError]);

      const { type, message } = await productsModels.listAll();
      expect(type).to.be.equal(resultTypes.databaseError);
      expect(message).to.equal(resultMsg.databaseError);
    });
  });

  describe('testing the single product query', function () {
    it('should return a product', async function () {
      sinon.stub(connection, 'execute').resolves([[allProductsResponse[0]]]);

      const { type, message } = await productsModels.findById(1);
      expect(type).to.equal(null);
      expect(message).to.deep.equal(allProductsResponse[0]);
    });

    it('should return a error resṕonse in case of error in database', async function () {
      sinon.stub(connection, 'execute').throws('message', [resultMsg.databaseError]);

      const { type, message } = await productsModels.findById(1);
      expect(type).to.be.equal(resultTypes.databaseError);
      expect(message).to.equal(resultMsg.databaseError);
    });
  });
});
