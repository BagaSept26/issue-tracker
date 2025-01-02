const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

describe('Functional Tests', function() {
    describe('Routing tests', function() {
        describe('POST /api/issues/{project} => object with issue data', function() {
            it('Create an issue with every field', function(done) {
                chai.request(server)
                .post('/api/issues/testproject')
                .send({issue_title: 'Test Title',issue_text: 'Test text',created_by: 'test creator',assigned_to: 'assigned to test',status_text: 'test status'})
                .end(function(err, res){
                    assert.equal(res.status, 200);
                    assert.equal(res.type, 'application/json');
                    assert.property(res.body, 'issue_title');
                    assert.property(res.body, 'issue_text');
                    assert.property(res.body, 'created_by');
                    assert.property(res.body, 'assigned_to');
                    assert.property(res.body, 'status_text');
                    assert.property(res.body, '_id');
                    assert.property(res.body, 'created_on');
                    assert.property(res.body, 'updated_on');
                    assert.property(res.body, 'open');
                    assert.equal(res.body.issue_title, 'Test Title');
                    assert.equal(res.body.issue_text, 'Test text');
                    assert.equal(res.body.created_by, 'test creator');
                    assert.equal(res.body.assigned_to, 'assigned to test');
                    assert.equal(res.body.status_text, 'test status');
                    assert.isTrue(res.body.open);
                    done();
                });
            });
        
            it('Create an issue with only required fields', function(done) {
                chai.request(server)
                .post('/api/issues/testproject')
                .send({issue_title: 'Test Title',issue_text: 'Test text',created_by: 'test creator',})
                .end(function(err, res){
                    assert.equal(res.status, 200);
                    assert.equal(res.type, 'application/json');
                    assert.property(res.body, 'issue_title');
                    assert.property(res.body, 'issue_text');
                    assert.property(res.body, 'created_by');
                    assert.property(res.body, 'assigned_to');
                    assert.property(res.body, 'status_text');
                    assert.property(res.body, '_id');
                    assert.property(res.body, 'created_on');
                    assert.property(res.body, 'updated_on');
                    assert.property(res.body, 'open');
                    assert.equal(res.body.issue_title, 'Test Title');
                    assert.equal(res.body.issue_text, 'Test text');
                    assert.equal(res.body.created_by, 'test creator');
                    assert.equal(res.body.assigned_to, '');
                    assert.equal(res.body.status_text, '');
                    assert.isTrue(res.body.open);
                    done();
                });
            });
            
           it('Create an issue with missing required fields', function(done) {
                chai.request(server)
                .post('/api/issues/testproject')
                .send({issue_title: 'Test Title',issue_text: 'Test text',})
                .end(function(err, res){
                    assert.equal(res.status, 200);
                    assert.equal(res.type, 'application/json');
                    assert.equal(res.body.error, 'required field(s) missing');
                    done();
                });
            });
        });
        
        describe('GET /api/issues/{project} => Array of objects with issue data', function() {
            it('View issues on a project',  function(done) {
                chai.request(server)
                .get('/api/issues/testproject')
                .end(function(err, res){
                    assert.equal(res.status, 200);
                    assert.equal(res.type, 'application/json');
                    assert.isArray(res.body);
                    assert.property(res.body[0], 'issue_title');
                    assert.property(res.body[0], 'issue_text');
                    assert.property(res.body[0], 'created_by');
                    assert.property(res.body[0], 'assigned_to');
                    assert.property(res.body[0], 'status_text');
                    assert.property(res.body[0], '_id');
                    assert.property(res.body[0], 'created_on');
                    assert.property(res.body[0], 'updated_on');
                    assert.property(res.body[0], 'open');
                    done();
                });
            });
            
            it('View issues on a project with one filter',  function(done) {
                chai.request(server)
                .get('/api/issues/testproject?open=true')
                .end(function(err, res){
                    assert.equal(res.status, 200);
                    assert.equal(res.type, 'application/json');
                    assert.isArray(res.body);
                    assert.property(res.body[0], 'issue_title');
                    assert.property(res.body[0], 'issue_text');
                    assert.property(res.body[0], 'created_by');
                    assert.property(res.body[0], 'assigned_to');
                    assert.property(res.body[0], 'status_text');
                    assert.property(res.body[0], '_id');
                    assert.property(res.body[0], 'created_on');
                    assert.property(res.body[0], 'updated_on');
                    assert.property(res.body[0], 'open');
                    assert.isTrue(res.body[0].open);
                    done();
                });
            });
        
            it('View issues on a project with multiple filters',  function(done) {
                chai.request(server)
                .get('/api/issues/testproject?open=true&created_by=test creator')
                    .end(function(err, res){
                        assert.equal(res.status, 200);
                        assert.equal(res.type, 'application/json');
                        assert.isArray(res.body);
                        assert.property(res.body[0], 'issue_title');
                        assert.property(res.body[0], 'issue_text');
                        assert.property(res.body[0], 'created_by');
                        assert.property(res.body[0], 'assigned_to');
                        assert.property(res.body[0], 'status_text');
                        assert.property(res.body[0], '_id');
                        assert.property(res.body[0], 'created_on');
                        assert.property(res.body[0], 'updated_on');
                        assert.property(res.body[0], 'open');
                        assert.isTrue(res.body[0].open);
                        assert.equal(res.body[0].created_by, 'test creator');
                    done();
                });
            });
        });
    
        describe('PUT /api/issues/{project} => object with updated issue data', function() {
            let issueId;
    
            before(function(done) {
                chai.request(server)
                .post('/api/issues/testproject')
                .send({issue_title: 'Test Title', issue_text: 'Test text', created_by: 'test creator'})
                .end(function(err, res){
                issueId = res.body._id;
                done();
                });
            });
            
            it('Update one field on an issue',  function(done) {
                chai.request(server)
                .put('/api/issues/testproject')
                .send({ _id: issueId, issue_text: 'update test' })
                .end(function(err, res){
                    assert.equal(res.status, 200);
                    assert.equal(res.type, 'application/json');
                    assert.equal(res.body.result, 'successfully updated');
                    assert.equal(res.body._id, issueId);
                    done();
                });
            });
            
            it('Update multiple fields on an issue',  function(done) {
                chai.request(server)
                .put('/api/issues/testproject')
                .send({ _id: issueId, issue_text: 'update test 2', open: false })
                    .end(function(err, res){
                    assert.equal(res.status, 200);
                        assert.equal(res.type, 'application/json');
                        assert.equal(res.body.result, 'successfully updated');
                        assert.equal(res.body._id, issueId);
                    done();
                });
            });
            
            it('Update an issue with missing _id', function(done) {
                chai.request(server)
                .put('/api/issues/testproject')
                .send({ issue_text: 'update test 2'})
                    .end(function(err, res){
                        assert.equal(res.status, 200);
                        assert.equal(res.type, 'application/json');
                        assert.equal(res.body.error, 'missing _id');
                    done();
                });
            });
            
            it('Update an issue with no fields to update', function(done) {
                chai.request(server)
                .put('/api/issues/testproject')
                .send({ _id: issueId})
                    .end(function(err, res){
                        assert.equal(res.status, 200);
                        assert.equal(res.type, 'application/json');
                        assert.equal(res.body.error, 'no update field(s) sent');
                        assert.equal(res.body._id, issueId);
                        done();
                });
            });
            
            it('Update an issue with an invalid _id', function(done) {
                chai.request(server)
                .put('/api/issues/testproject')
                .send({ _id: '5f665eb46e244b1a42d38e1d', issue_text: 'update test 2'})
                    .end(function(err, res){
                        assert.equal(res.status, 200);
                        assert.equal(res.type, 'application/json');
                        assert.equal(res.body.error, 'could not update');
                        assert.equal(res.body._id, '5f665eb46e244b1a42d38e1d');
                    done();
                });
            });
        });
    
        describe('DELETE /api/issues/{project} => object with deletion result', function() {
            let issueId;
    
            before(function(done) {
                chai.request(server)
                .post('/api/issues/testproject')
                .send({
                issue_title: 'Test Title',
                issue_text: 'Test text',
                created_by: 'test creator'
                })
                .end(function(err, res){
                issueId = res.body._id;
                done();
                });
            });
            
            it('Delete an issue', function(done) {
                chai.request(server)
                .delete('/api/issues/testproject')
                .send({ _id: issueId })
                    .end(function(err, res){
                    assert.equal(res.status, 200);
                    assert.equal(res.type, 'application/json');
                    assert.equal(res.body.result, 'successfully deleted');
                        assert.equal(res.body._id, issueId);
                    done();
                });
            });
            
            it('Delete an issue with an invalid _id', function(done) {
                chai.request(server)
                    .delete('/api/issues/testproject')
                .send({ _id: '5f665eb46e244b1a42d38e1d'})
                    .end(function(err, res){
                    assert.equal(res.status, 200);
                    assert.equal(res.type, 'application/json');
                    assert.equal(res.body.error, 'could not delete');
                    assert.equal(res.body._id, '5f665eb46e244b1a42d38e1d');
                    done();
                });
            });
            
            it('Delete an issue with missing _id', function(done) {
                chai.request(server)
                    .delete('/api/issues/testproject')
                    .end(function(err, res){
                        assert.equal(res.status, 200);
                        assert.equal(res.type, 'application/json');
                        assert.equal(res.body.error, 'missing _id');
                    done();
                });
            });
        });
    });
});