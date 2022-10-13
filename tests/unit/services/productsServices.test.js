const { expect } = require("chai");
const sinon = require('sinon');

const { resultTypes, resultMsg } = require("../../../src/utils/errorResults");
const { allProductsResponse } = require("../../../__tests__/_dataMock");
const { getResponse, databaseError } = require("../utils/modulesResponses");
const { productsModels } = require('./../../../src/models');
const { productsServices } = require('./../../../src/services');

describe('Products Service Layer Unit Testing', function () {
  afterEach(sinon.restore);

  describe('testing the products listing service', function () {
    it('should return a list of products', async function () {
      sinon.stub(productsModels, 'listAll').resolves(getResponse(null, allProductsResponse));

      const { type, message } = await productsServices.listAll();

      expect(type).to.equal(null);
      expect(message).to.equal(allProductsResponse);
    });

    it('should return a error in case of database error', async function () {
      sinon.stub(productsModels, 'listAll').resolves(databaseError);

      const { type, message } = await productsServices.listAll();

      expect(type).to.equal(resultTypes.databaseError);
      expect(message).to.equal(resultMsg.databaseError);
    });
  });

  describe('testing the single product listing service', function () {
    it('should return one product', async function () {
      sinon.stub(productsModels, 'findById').resolves(getResponse(null, allProductsResponse[0]));

      const { type, message } = await productsServices.findById(1);

      expect(type).to.equal(null);
      expect(message).to.equal(allProductsResponse[0]);
    });

    it('should return "product not found" in case of a inexistent id parameter', async function () {
      sinon.stub(productsModels, 'findById').resolves(getResponse(resultTypes.productNotFound, resultMsg.productNotFound));

      const { type, message } = await productsServices.findById(1);

      expect(type).to.equal(resultTypes.productNotFound);
      expect(message).to.equal(resultMsg.productNotFound);
    });

    it('should return a error in case of database error', async function () {
      sinon.stub(productsModels, 'findById').resolves(databaseError);

      const { type, message } = await productsServices.findById(1);

      expect(type).to.equal(resultTypes.databaseError);
      expect(message).to.equal(resultMsg.databaseError);
    });
  });
});
