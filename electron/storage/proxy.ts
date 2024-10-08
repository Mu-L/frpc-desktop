import Datastore from "nedb";
import path from "path";
import { app } from "electron";

const log = require("electron-log");

const proxyDB = new Datastore({
  autoload: true,
  filename: path.join(app.getPath("userData"), "proxy.db")
});

/**
 * 新增代理
 * @param proxy
 * @param cb
 */
export const insertProxy = (
  proxy: Proxy,
  cb?: (err: Error | null, document: Proxy) => void
) => {
  log.debug(`新增代理：${JSON.stringify(proxy)}`);
  proxyDB.insert(proxy, cb);
};

/**
 * 删除代理
 * @param _id
 * @param cb
 */
export const deleteProxyById = (
  _id: string,
  cb?: (err: Error | null, n: number) => void
) => {
  log.debug(`删除代理：${_id}`);
  proxyDB.remove({ _id: _id }, cb);
};

/**
 * 修改代理
 */
export const updateProxyById = (
  proxy: Proxy,
  cb?: (err: Error | null, numberOfUpdated: number, upsert: boolean) => void
) => {
  log.debug(`修改代理：${proxy}`);
  proxyDB.update({ _id: proxy._id }, proxy, {}, cb);
};

/**
 * 查找
 * @param cb
 */
export const listProxy = (
  callback: (err: Error | null, documents: Proxy[]) => void
) => {
  proxyDB.find({}, callback);
};

/**
 * 根据id查询
 * @param id
 * @param callback
 */
export const getProxyById = (
  id: string,
  callback: (err: Error | null, document: Proxy) => void
) => {
  proxyDB.findOne({ _id: id }, callback);
};

/**
 * 清空代理
 * @param cb
 */
export const clearProxy = (cb?: (err: Error | null, n: number) => void) => {
  proxyDB.remove({}, { multi: true }, cb);
};

/**
 * 更新代理状态
 * @param id id
 * @param st 状态
 * @param cb 回调
 */
export const updateProxyStatus = (
  id: string,
  st: boolean,
  cb?: (err: Error | null, numberOfUpdated: number, upsert: boolean) => void
) => {
  proxyDB.update({ _id: id }, { $set: { status: st } }, {}, cb);
};
