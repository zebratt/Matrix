"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/.pnpm/@umijs+preset-umi@4.0.47_4pcglwdtq4xwbyuxwoggeg67fa/node_modules/@umijs/preset-umi/dist/features/apiRoute/utils.js
var require_utils = __commonJS({
  "node_modules/.pnpm/@umijs+preset-umi@4.0.47_4pcglwdtq4xwbyuxwoggeg67fa/node_modules/@umijs/preset-umi/dist/features/apiRoute/utils.js"(exports, module2) {
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var utils_exports = {};
    __export2(utils_exports, {
      esbuildIgnorePathPrefixPlugin: () => esbuildIgnorePathPrefixPlugin,
      matchApiRoute: () => matchApiRoute2
    });
    module2.exports = __toCommonJS2(utils_exports);
    function esbuildIgnorePathPrefixPlugin() {
      return {
        name: "ignore-path-prefix",
        setup(build) {
          build.onResolve({ filter: /^@fs/ }, (args) => ({
            path: args.path.replace(/^@fs/, "")
          }));
        }
      };
    }
    function matchApiRoute2(apiRoutes2, path) {
      if (path.startsWith("/"))
        path = path.substring(1);
      if (path.startsWith("api/"))
        path = path.substring(4);
      const pathSegments = path.split("/").filter((p) => p !== "");
      if (pathSegments.length === 0 || pathSegments.length === 1 && pathSegments[0] === "api") {
        const route2 = apiRoutes2.find((r) => r.path === "/");
        if (route2)
          return { route: route2, params: {} };
        else
          return void 0;
      }
      const params = {};
      const route = apiRoutes2.find((route2) => {
        const routePathSegments = route2.path.split("/").filter((p) => p !== "");
        if (routePathSegments.length !== pathSegments.length)
          return false;
        for (let i = 0; i < routePathSegments.length; i++) {
          const routePathSegment = routePathSegments[i];
          if (routePathSegment.match(/^\[.*]$/)) {
            params[routePathSegment.substring(1, routePathSegment.length - 1)] = pathSegments[i];
            if (i == routePathSegments.length - 1)
              return true;
            continue;
          }
          if (routePathSegment !== pathSegments[i])
            return false;
          if (i == routePathSegments.length - 1)
            return true;
        }
      });
      if (route)
        return { route, params };
    }
  }
});

// node_modules/.pnpm/@umijs+preset-umi@4.0.47_4pcglwdtq4xwbyuxwoggeg67fa/node_modules/@umijs/preset-umi/dist/features/apiRoute/request.js
var require_request = __commonJS({
  "node_modules/.pnpm/@umijs+preset-umi@4.0.47_4pcglwdtq4xwbyuxwoggeg67fa/node_modules/@umijs/preset-umi/dist/features/apiRoute/request.js"(exports, module2) {
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var request_exports = {};
    __export2(request_exports, {
      default: () => request_default,
      parseMultipart: () => parseMultipart,
      parseUrlEncoded: () => parseUrlEncoded
    });
    module2.exports = __toCommonJS2(request_exports);
    var import_utils = require_utils();
    var UmiApiRequest3 = class {
      constructor(req, apiRoutes2) {
        this._params = {};
        this._body = null;
        this._req = req;
        const m = (0, import_utils.matchApiRoute)(apiRoutes2, this.pathName || "");
        if (m)
          this._params = m.params;
      }
      get params() {
        return this._params;
      }
      get body() {
        return this._body;
      }
      get headers() {
        return this._req.headers;
      }
      get method() {
        return this._req.method;
      }
      get query() {
        var _a, _b;
        return ((_b = (_a = this._req.url) == null ? void 0 : _a.split("?")[1]) == null ? void 0 : _b.split("&").reduce((acc, cur) => {
          const [key, value] = cur.split("=");
          const k = acc[key];
          if (k) {
            if (k instanceof Array) {
              k.push(value);
            } else {
              acc[key] = [k, value];
            }
          } else {
            acc[key] = value;
          }
          return acc;
        }, {})) || {};
      }
      get cookies() {
        var _a;
        return (_a = this._req.headers.cookie) == null ? void 0 : _a.split(";").reduce((acc, cur) => {
          const [key, value] = cur.split("=");
          acc[key.trim()] = value;
          return acc;
        }, {});
      }
      get url() {
        return this._req.url;
      }
      get pathName() {
        var _a;
        return (_a = this._req.url) == null ? void 0 : _a.split("?")[0];
      }
      readBody() {
        if (this._req.headers["content-length"] === "0") {
          return Promise.resolve();
        }
        return new Promise((resolve, reject) => {
          let body = [];
          this._req.on("data", (chunk) => {
            body.push(chunk);
          });
          this._req.on("end", () => {
            var _a, _b;
            const bodyBuffer = Buffer.concat(body);
            switch ((_a = this._req.headers["content-type"]) == null ? void 0 : _a.split(";")[0]) {
              case "application/json":
                try {
                  this._body = JSON.parse(bodyBuffer.toString());
                } catch (e) {
                  this._body = body;
                }
                break;
              case "multipart/form-data":
                const boundary = (_b = this.headers["content-type"]) == null ? void 0 : _b.split("boundary=")[1];
                if (!boundary) {
                  this._body = body;
                  break;
                }
                this._body = parseMultipart(bodyBuffer, boundary);
                break;
              case "application/x-www-form-urlencoded":
                this._body = parseUrlEncoded(bodyBuffer.toString());
                break;
              default:
                this._body = body;
                break;
            }
            resolve();
          });
          this._req.on("error", reject);
        });
      }
    };
    function parseMultipart(body, boundary) {
      const hexBoundary = Buffer.from(`--${boundary}`, "utf-8").toString("hex");
      return body.toString("hex").split(hexBoundary).reduce((acc, cur) => {
        var _a, _b;
        const [hexMeta, hexValue] = cur.split(
          Buffer.from("\r\n\r\n").toString("hex")
        );
        const meta = Buffer.from(hexMeta, "hex").toString("utf-8");
        const name = (_a = meta.split('name="')[1]) == null ? void 0 : _a.split('"')[0];
        if (!name)
          return acc;
        const fileName = (_b = meta.split('filename="')[1]) == null ? void 0 : _b.split('"')[0];
        if (fileName) {
          const fileBufferBeforeTrim = Buffer.from(hexValue, "hex");
          const fileBuffer = fileBufferBeforeTrim.slice(
            0,
            fileBufferBeforeTrim.byteLength - 2
          );
          const contentType = meta.split("Content-Type: ")[1];
          acc[name] = {
            fileName,
            data: fileBuffer,
            contentType
          };
          return acc;
        }
        const valueBufferBeforeTrim = Buffer.from(hexValue, "hex");
        const valueBuffer = valueBufferBeforeTrim.slice(
          0,
          valueBufferBeforeTrim.byteLength - 2
        );
        acc[name] = valueBuffer.toString("utf-8");
        return acc;
      }, {});
    }
    function parseUrlEncoded(body) {
      return body.split("&").reduce((acc, cur) => {
        const [key, value] = cur.split("=");
        acc[key] = decodeURIComponent(value);
        return acc;
      }, {});
    }
    var request_default = UmiApiRequest3;
  }
});

// node_modules/.pnpm/@umijs+preset-umi@4.0.47_4pcglwdtq4xwbyuxwoggeg67fa/node_modules/@umijs/preset-umi/dist/features/apiRoute/response.js
var require_response = __commonJS({
  "node_modules/.pnpm/@umijs+preset-umi@4.0.47_4pcglwdtq4xwbyuxwoggeg67fa/node_modules/@umijs/preset-umi/dist/features/apiRoute/response.js"(exports, module2) {
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var response_exports = {};
    __export2(response_exports, {
      default: () => response_default
    });
    module2.exports = __toCommonJS2(response_exports);
    var UmiApiResponse3 = class {
      constructor(res) {
        this._res = res;
      }
      status(statusCode) {
        this._res.statusCode = statusCode;
        return this;
      }
      header(key, value) {
        this._res.setHeader(key, value);
        return this;
      }
      setCookie(key, value) {
        this._res.setHeader("Set-Cookie", `${key}=${value}; path=/`);
        return this;
      }
      end(data) {
        this._res.end(data);
        return this;
      }
      text(data) {
        this._res.setHeader("Content-Type", "text/plain; charset=utf-8");
        this._res.end(data);
        return this;
      }
      html(data) {
        this._res.setHeader("Content-Type", "text/html; charset=utf-8");
        this._res.end(data);
        return this;
      }
      json(data) {
        this._res.setHeader("Content-Type", "application/json");
        this._res.end(JSON.stringify(data));
        return this;
      }
    };
    var response_default = UmiApiResponse3;
  }
});

// node_modules/.pnpm/@umijs+preset-umi@4.0.47_4pcglwdtq4xwbyuxwoggeg67fa/node_modules/@umijs/preset-umi/dist/features/apiRoute/index.js
var require_apiRoute = __commonJS({
  "node_modules/.pnpm/@umijs+preset-umi@4.0.47_4pcglwdtq4xwbyuxwoggeg67fa/node_modules/@umijs/preset-umi/dist/features/apiRoute/index.js"(exports, module2) {
    var __create2 = Object.create;
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __getProtoOf2 = Object.getPrototypeOf;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toESM2 = (mod, isNodeMode, target) => (target = mod != null ? __create2(__getProtoOf2(mod)) : {}, __copyProps2(
      isNodeMode || !mod || !mod.__esModule ? __defProp2(target, "default", { value: mod, enumerable: true }) : target,
      mod
    ));
    var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var apiRoute_exports = {};
    __export2(apiRoute_exports, {
      UmiApiRequest: () => import_request.default,
      UmiApiResponse: () => import_response.default,
      matchApiRoute: () => import_utils.matchApiRoute
    });
    module2.exports = __toCommonJS2(apiRoute_exports);
    var import_request = __toESM2(require_request());
    var import_response = __toESM2(require_response());
    var import_utils = require_utils();
  }
});

// src/.umi/api/index.ts
var api_exports = {};
__export(api_exports, {
  default: () => api_default2
});
module.exports = __toCommonJS(api_exports);

// src/.umi/api/_middlewares.ts
var middlewares_default = async (req, res, next) => {
  next();
};

// src/api/index.ts
async function api_default(req, res) {
  res.json({
    code: "100"
  });
}

// src/.umi/api/index.ts
var import_apiRoute = __toESM(require_apiRoute());
var apiRoutes = [{ "path": "mocks/file/update", "id": "mocks/file/update", "file": "mocks/file/update.ts", "absPath": "/mocks/file/update", "__content": "import type { UmiApiRequest, UmiApiResponse } from 'umi';\nimport { PrismaClient } from '@prisma/client';\n\nconst prisma = new PrismaClient();\n\nexport default async function (req: UmiApiRequest, res: UmiApiResponse) {\n  if (req.method === 'POST') {\n    try {\n      const data = await prisma.mockFile.update({\n        where: {\n          id: req.body.id,\n        },\n        data: {\n          content: req.body.content,\n        },\n      });\n\n      res.status(201).json({\n        code: 0,\n        data: {\n          id: data.id,\n        },\n      });\n\n      await prisma.$disconnect();\n    } catch (err) {\n      console.log(err);\n      res.status(500).json({\n        code: -1,\n        message: JSON.stringify(err),\n      });\n    }\n  } else {\n    res.status(405).json({ error: 'Method not allowed' });\n  }\n}\n" }, { "path": "mocks/tree/delete", "id": "mocks/tree/delete", "file": "mocks/tree/delete.ts", "absPath": "/mocks/tree/delete", "__content": "import type { UmiApiRequest, UmiApiResponse } from 'umi';\nimport { PrismaClient } from '@prisma/client';\n\nconst prisma = new PrismaClient();\n\nexport default async function (req: UmiApiRequest, res: UmiApiResponse) {\n  if (req.method === 'POST') {\n    try {\n      const data = await prisma.mockFileTree.deleteMany({\n        where: {\n          OR: [{ id: req.body.id }, { parentId: req.body.id }],\n        },\n      });\n\n      res.status(201).json({\n        code: 0,\n        data: {\n          deletedCount: data.count,\n        },\n      });\n\n      await prisma.$disconnect();\n    } catch (err) {\n      console.log(err);\n      res.status(500).json({\n        code: -1,\n        message: JSON.stringify(err),\n      });\n    }\n  } else {\n    res.status(405).json({ error: 'Method not allowed' });\n  }\n}\n" }, { "path": "notes/label/query", "id": "notes/label/query", "file": "notes/label/query.ts", "absPath": "/notes/label/query", "__content": "import type { UmiApiRequest, UmiApiResponse } from 'umi';\nimport { PrismaClient } from '@prisma/client';\n\nconst prisma = new PrismaClient();\n\nexport default async function (req: UmiApiRequest, res: UmiApiResponse) {\n  if (req.method === 'GET') {\n    try {\n      const tags = await prisma.tag.findMany();\n\n      res.status(200).json({\n        code: 0,\n        data: tags,\n      });\n\n      await prisma.$disconnect();\n    } catch (err) {\n      console.log(err);\n      res.status(500).json({\n        code: -1,\n        message: err,\n      });\n    }\n  } else {\n    res.status(405).json({ error: 'Method not allowed' });\n  }\n}\n" }, { "path": "notes/note/delete", "id": "notes/note/delete", "file": "notes/note/delete.ts", "absPath": "/notes/note/delete", "__content": "import type { UmiApiRequest, UmiApiResponse } from 'umi';\nimport { PrismaClient } from '@prisma/client';\n\nconst prisma = new PrismaClient();\n\nexport default async function (req: UmiApiRequest, res: UmiApiResponse) {\n  if (req.method === 'POST') {\n    try {\n      const note = await prisma.note.delete({\n        where: {\n          id: req.body.id,\n        },\n      });\n\n      res.status(201).json({\n        code: 0,\n        data: {\n          id: note.id,\n        },\n      });\n\n      await prisma.$disconnect();\n    } catch (err) {\n      console.log(err);\n      res.status(500).json({\n        code: -1,\n        message: JSON.stringify(err),\n      });\n    }\n  } else {\n    res.status(405).json({ error: 'Method not allowed' });\n  }\n}\n" }, { "path": "notes/note/update", "id": "notes/note/update", "file": "notes/note/update.ts", "absPath": "/notes/note/update", "__content": "import type { UmiApiRequest, UmiApiResponse } from 'umi';\nimport { PrismaClient } from '@prisma/client';\nimport type { NoteTag } from '@/types/tags';\n\nconst prisma = new PrismaClient();\n\nexport default async function (req: UmiApiRequest, res: UmiApiResponse) {\n  if (req.method === 'POST') {\n    try {\n      const note = await prisma.note.update({\n        where: {\n          id: req.body.id,\n        },\n        data: {\n          html: req.body.html,\n          tags: {\n            deleteMany: {\n              noteId: req.body.id,\n            },\n            create: (req.body.tags || []).map((tag: NoteTag) => {\n              return {\n                tag: {\n                  connect: {\n                    id: tag.id,\n                  },\n                },\n              };\n            }),\n          },\n        },\n      });\n\n      res.status(201).json({\n        code: 0,\n        data: {\n          id: note.id,\n        },\n      });\n\n      await prisma.$disconnect();\n    } catch (err) {\n      console.log(err);\n      res.status(500).json({\n        code: -1,\n        message: JSON.stringify(err),\n      });\n    }\n  } else {\n    res.status(405).json({ error: 'Method not allowed' });\n  }\n}\n" }, { "path": "mocks/file/query", "id": "mocks/file/query", "file": "mocks/file/query.ts", "absPath": "/mocks/file/query", "__content": "import type { UmiApiRequest, UmiApiResponse } from 'umi';\nimport { PrismaClient } from '@prisma/client';\n\nconst prisma = new PrismaClient();\n\nexport default async function (req: UmiApiRequest, res: UmiApiResponse) {\n  if (req.method === 'POST') {\n    try {\n      const data = await prisma.mockFile.findMany({\n        where: {\n          treeId: req.body.treeId,\n        },\n      });\n\n      res.status(200).json({\n        code: 0,\n        data: data,\n      });\n\n      await prisma.$disconnect();\n    } catch (err) {\n      console.log(err);\n      res.status(500).json({\n        code: -1,\n        message: err,\n      });\n    }\n  } else {\n    res.status(405).json({ error: 'Method not allowed' });\n  }\n}\n" }, { "path": "mocks/tree/query", "id": "mocks/tree/query", "file": "mocks/tree/query.ts", "absPath": "/mocks/tree/query", "__content": "import type { UmiApiRequest, UmiApiResponse } from 'umi';\nimport { MockFileTree, PrismaClient } from '@prisma/client';\n\nconst prisma = new PrismaClient();\n\ntype Node = Omit<MockFileTree, 'parentId'> & { children?: Node[] };\n\nfunction buildTree(data: MockFileTree[], parentId?: number) {\n  const tree: Node[] = [];\n\n  data.forEach((node) => {\n    if ((!parentId && !node.parentId) || node.parentId === parentId) {\n      const children = buildTree(data, node.id);\n      tree.push({ ...node, children });\n    }\n  });\n\n  return tree;\n}\n\nexport default async function (req: UmiApiRequest, res: UmiApiResponse) {\n  if (req.method === 'GET') {\n    try {\n      const data = await prisma.mockFileTree.findMany();\n      const tree = buildTree(data);\n\n      res.status(200).json({\n        code: 0,\n        data: tree,\n      });\n\n      await prisma.$disconnect();\n    } catch (err) {\n      console.log(err);\n      res.status(500).json({\n        code: -1,\n        message: err,\n      });\n    }\n  } else {\n    res.status(405).json({ error: 'Method not allowed' });\n  }\n}\n" }, { "path": "notes/note/query", "id": "notes/note/query", "file": "notes/note/query.ts", "absPath": "/notes/note/query", "__content": "import type { UmiApiRequest, UmiApiResponse } from 'umi';\nimport { PrismaClient } from '@prisma/client';\n\nconst prisma = new PrismaClient();\n\nexport default async function (req: UmiApiRequest, res: UmiApiResponse) {\n  if (req.method === 'POST') {\n    try {\n      const notes = await prisma.note.findMany({\n        orderBy: {\n          updateAt: 'desc',\n        },\n        include: {\n          tags: {\n            include: {\n              tag: true,\n            },\n          },\n        },\n      });\n\n      const data = notes\n        .map((note) => ({\n          ...note,\n          tags: note.tags.map((tag) => tag.tag),\n        }))\n        .filter((note) => {\n          if (!req.body.tagId) return true;\n\n          return note.tags.map((t) => t.id).includes(Number(req.body.tagId));\n        });\n\n      res.status(200).json({\n        code: 0,\n        data,\n      });\n\n      await prisma.$disconnect();\n    } catch (err) {\n      console.log(err);\n      res.status(500).json({\n        code: -1,\n        message: err,\n      });\n    }\n  } else {\n    res.status(405).json({ error: 'Method not allowed' });\n  }\n}\n" }, { "path": "notes/label/add", "id": "notes/label/add", "file": "notes/label/add.ts", "absPath": "/notes/label/add", "__content": "import type { UmiApiRequest, UmiApiResponse } from 'umi';\nimport { PrismaClient } from '@prisma/client';\n\nconst prisma = new PrismaClient();\n\nexport default async function (req: UmiApiRequest, res: UmiApiResponse) {\n  if (req.method === 'POST') {\n    try {\n      const tag = await prisma.tag.create({\n        data: {\n          label: req.body.label,\n        },\n      });\n\n      res.status(201).json({\n        code: 0,\n        data: {\n          id: tag.id,\n        },\n      });\n\n      await prisma.$disconnect();\n    } catch (err) {\n      console.log(err);\n      res.status(500).json({\n        code: -1,\n        message: err,\n      });\n    }\n  } else {\n    res.status(405).json({ error: 'Method not allowed' });\n  }\n}\n" }, { "path": "mocks/file/add", "id": "mocks/file/add", "file": "mocks/file/add.ts", "absPath": "/mocks/file/add", "__content": "import type { UmiApiRequest, UmiApiResponse } from 'umi';\nimport { PrismaClient } from '@prisma/client';\n\nconst prisma = new PrismaClient();\n\nexport default async function (req: UmiApiRequest, res: UmiApiResponse) {\n  if (req.method === 'POST') {\n    try {\n      const data = await prisma.mockFile.create({\n        data: {\n          content: req.body.content,\n          treeId: req.body.treeId,\n        },\n      });\n\n      res.status(201).json({\n        code: 0,\n        data: {\n          id: data.id,\n        },\n      });\n\n      await prisma.$disconnect();\n    } catch (err) {\n      console.log(err);\n      res.status(500).json({\n        code: -1,\n        message: JSON.stringify(err),\n      });\n    }\n  } else {\n    res.status(405).json({ error: 'Method not allowed' });\n  }\n}\n" }, { "path": "mocks/tree/add", "id": "mocks/tree/add", "file": "mocks/tree/add.ts", "absPath": "/mocks/tree/add", "__content": "import type { UmiApiRequest, UmiApiResponse } from 'umi';\nimport { PrismaClient } from '@prisma/client';\n\nconst prisma = new PrismaClient();\n\nexport default async function (req: UmiApiRequest, res: UmiApiResponse) {\n  if (req.method === 'POST') {\n    try {\n      const data = await prisma.mockFileTree.create({\n        data: {\n          parentId: req.body.parentId,\n          path: req.body.path,\n          fullPath: req.body.fullPath,\n          desc: req.body.desc,\n        },\n      });\n\n      res.status(201).json({\n        code: 0,\n        data: {\n          id: data.id,\n        },\n      });\n\n      await prisma.$disconnect();\n    } catch (err) {\n      console.log(err);\n      res.status(500).json({\n        code: -1,\n        message: JSON.stringify(err),\n      });\n    }\n  } else {\n    res.status(405).json({ error: 'Method not allowed' });\n  }\n}\n" }, { "path": "notes/note/add", "id": "notes/note/add", "file": "notes/note/add.ts", "absPath": "/notes/note/add", "__content": "import type { UmiApiRequest, UmiApiResponse } from 'umi';\nimport { PrismaClient } from '@prisma/client';\nimport type { NoteTag } from '@/types/tags';\n\nconst prisma = new PrismaClient();\n\nexport default async function (req: UmiApiRequest, res: UmiApiResponse) {\n  if (req.method === 'POST') {\n    try {\n      const note = await prisma.note.create({\n        data: {\n          html: req.body.html,\n          tags: {\n            create: (req.body.tags || []).map((tag: NoteTag) => {\n              return {\n                tag: {\n                  connect: {\n                    id: tag.id,\n                  },\n                },\n              };\n            }),\n          },\n        },\n      });\n\n      res.status(201).json({\n        code: 0,\n        data: {\n          id: note.id,\n        },\n      });\n\n      await prisma.$disconnect();\n    } catch (err) {\n      console.log(err);\n      res.status(500).json({\n        code: -1,\n        message: JSON.stringify(err),\n      });\n    }\n  } else {\n    res.status(405).json({ error: 'Method not allowed' });\n  }\n}\n" }, { "path": "/", "id": "index", "file": "index.ts", "absPath": "/", "__content": "module.exports = (req, res) => {\n  res.setHeader('content-type', 'text/plain');\n  res.send('abcabc');\n};\n" }];
var api_default2 = async (req, res) => {
  const umiReq = new import_apiRoute.UmiApiRequest(req, apiRoutes);
  await umiReq.readBody();
  const umiRes = new import_apiRoute.UmiApiResponse(res);
  await new Promise((resolve) => middlewares_default(umiReq, umiRes, resolve));
  await api_default(umiReq, umiRes);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
