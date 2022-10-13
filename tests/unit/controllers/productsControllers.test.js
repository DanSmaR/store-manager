const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { expect } = require('chai');

const { resultTypes, resultMsg } = require("../../../src/utils/errorResults");
const { allProductsResponse } = require("../../../__tests__/_dataMock");
const { getResponse, databaseError } = require("../utils/modulesResponses");
const { productsServices } = require('./../../../src/services');
const { productsController } = require('./../../../src/controllers');

chai.use(sinonChai);

describe('Products Controllers Layer Unit Testing', function () {
  afterEach(sinon.restore);

  describe('Testing the /products endpoint', function () {
    it('should return all the products at get method', async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsServices, 'listAll').resolves(getResponse(null, allProductsResponse));

      await productsController.listAllProducts(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allProductsResponse);
    });

    it('should throw a error at get method in case of database error', async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsServices, 'listAll').resolves(databaseError);

      try {
        await productsController.listAllProducts(req, res);
      } catch (error) {
        console.error(error.message);
        expect(res.status).to.have.not.been.calledWith(200);
        expect(res.json).to.have.not.been.calledWith();
      }
    });
  });

  describe('Testing the /products/:productId endpoint', function () {
    it('should return one product at get method', async function () {
      const res = {};
      const req = { params: { productId: 1 }};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsServices, 'findById').resolves(getResponse(null, allProductsResponse[0]));

      await productsController.getOneProduct(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allProductsResponse[0]);
    });

    it('should throw a error at get method with a inexistent id params', async function () {
      const res = {};
      const req = { params: { productId: 999 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsServices, 'findById')
        .resolves(getResponse(resultTypes.productNotFound, resultMsg.productNotFound));

      try {
        await productsController.getOneProduct(req, res);
      } catch (error) {
        console.error(error.message);
        expect(res.status).to.have.not.been.calledWith(200);
        expect(res.json).to.have.not.been.calledWith();
      };
    });

    it('should throw a error at get method in case of database error', async function () {
      const res = {};
      const req = { params: { productId: 1 }};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsServices, 'findById').resolves(databaseError);

      try {
        await productsController.getOneProduct(req, res);
      } catch (error) {
        console.error(error.message);
        expect(res.status).to.have.not.been.calledWith(200);
        expect(res.json).to.have.not.been.calledWith();
      }
    });
  });
});
