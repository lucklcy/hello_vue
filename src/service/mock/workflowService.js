// -----------------------------     工作流管理    ------------------------------ //

export default [
  // 根据工作流Id获取工作流已经配置的节点信息
  {
    urlReg:
      /^\/internalApi\/mkt-ads-udc-adm\/udcAdmService\/callback\/flow\/selectById$/,
    resultCbk: (url, type, body) => {
      console.log(`'${url}' by '${type}'\t\tparams is:${body}`);
      return {
        Result: 0,
        CodeMsg: null,
        ResultMessage: null,
        Content: {
          name: "头条H5-注册",
          mediaId: 2,
          mediaName: "头条H5",
          callbackType: 1,
          doCallbackType: 1,
          callbackName: "注册",
          nodeList: [
            {
              code: "dupDayCallbackNode",
              name: "重复上报",
              sortId: 1,
              configType: "DEV_CONFIG",
              params: { dupDays: "30", dimension: "0" },
            },
            {
              code: "timeStampKeyNode",
              name: "当前时间",
              sortId: 2,
              configType: "NOT_NEED_CONFIG",
              params: null,
            },
            {
              code: "eventTypeKeyNode",
              name: "回传字段",
              sortId: 3,
              configType: "BIZ_CONFIG",
              params: { eventTypes: [{ code: "19", desc: "有效获客" }] },
            },
            {
              code: "callbackNode",
              name: "回传",
              sortId: 4,
              configType: "DEV_CONFIG",
              params: {
                expectedResponse: '{"successKey": "ret","successValue": "0"}',
                requestType: "get",
                requestUrl:
                  "https://ad.oceanengine.com/track/activate/?callback=#{currentUrl_clickid}#{currentUrl_callback}&conv_time=#{timestampSecond}&event_type=19",
              },
            },
            {
              code: "enterpriseAuthNode",
              name: "企业认证",
              sortId: 4,
              configType: "BIZ_CONFIG",
              params: { switch: true, method: "auth" },
            },
          ],
        },
      };
    },
  },
  // 获取所有工作流可配置节点
  {
    urlReg:
      /^\/internalApi\/mkt-ads-udc-adm\/udcAdmService\/callback\/flow\/selectAllFlowNode$/,
    resultCbk: (url, type, body) => {
      console.log(`'${url}' by '${type}'\t\tparams is:${body}`);
      return {
        Result: 0,
        CodeMsg: null,
        ResultMessage: null,
        Content: [
          {
            code: "bidTimeDiffNode",
            name: "发标注册时间差",
            sortId: null,
            configType: "BIZ_CONFIG",
            params: null,
          },
          {
            code: "eventTimeChannelTypeDiffNode",
            name: "事件归因时间差",
            sortId: null,
            configType: "BIZ_CONFIG",
            params: null,
          },
          {
            code: "preAuditYesTimeDiffNode",
            name: "预审通过注册时间差",
            sortId: null,
            configType: "BIZ_CONFIG",
            params: null,
          },
          {
            code: "eventTimeDiffNode",
            name: "事件注册时间差",
            sortId: null,
            configType: "BIZ_CONFIG",
            params: null,
          },
          {
            code: "amountGivenTimeDiffNode",
            name: "给额注册时间差",
            sortId: null,
            configType: "BIZ_CONFIG",
            params: null,
          },
          {
            code: "dupDayCallbackNode",
            name: "重复上报",
            sortId: null,
            configType: "DEV_CONFIG",
            params: null,
          },
          {
            code: "institutionNode",
            name: "机构",
            sortId: null,
            configType: "BIZ_CONFIG",
            params: null,
          },
          {
            code: "creditAmountNode",
            name: "最小信用额度",
            sortId: null,
            configType: "BIZ_CONFIG",
            params: null,
          },
          {
            code: "evaluateNode",
            name: "表达式",
            sortId: null,
            configType: "BIZ_CONFIG",
            params: null,
          },
          {
            code: "bizIdNode",
            name: "业务线",
            sortId: null,
            configType: "BIZ_CONFIG",
            params: null,
          },
          {
            code: "fakeAmountGivenNode",
            name: "真假给额",
            sortId: null,
            configType: "BIZ_CONFIG",
            params: null,
          },
          {
            code: "bidAmountNode",
            name: "最小发标金额",
            sortId: null,
            configType: "BIZ_CONFIG",
            params: null,
          },
          {
            code: "listTypeNode",
            name: "ListType",
            sortId: null,
            configType: "BIZ_CONFIG",
            params: null,
          },
          {
            code: "eventTypeKeyNode",
            name: "回传字段",
            sortId: null,
            configType: "BIZ_CONFIG",
            params: null,
          },
          {
            code: "signKeyNode",
            name: "加密",
            sortId: null,
            configType: "DEV_CONFIG",
            params: null,
          },
          {
            code: "timeStampKeyNode",
            name: "当前时间",
            sortId: null,
            configType: "NOT_NEED_CONFIG",
            params: null,
          },
          {
            code: "uuidKeyNode",
            name: "UUID",
            sortId: null,
            configType: "NOT_NEED_CONFIG",
            params: null,
          },
          {
            code: "mobileKeyNode",
            name: "手机号",
            sortId: null,
            configType: "NOT_NEED_CONFIG",
            params: null,
          },
          {
            code: "accessTokenWeiBoKeyNode",
            name: "微博AccessToken",
            sortId: null,
            configType: "DEV_CONFIG",
            params: null,
          },
          {
            code: "tencentActionSetIdKeyNode",
            name: "腾讯数据源ID",
            sortId: null,
            configType: "DEV_CONFIG",
            params: null,
          },
          {
            code: "accessTokenGdtKeyNode",
            name: "广点通AccessToken",
            sortId: null,
            configType: "DEV_CONFIG",
            params: null,
          },
          {
            code: "accessTokenGzhH5KeyNode",
            name: "微信公众号AccessToken",
            sortId: null,
            configType: "BIZ_CONFIG",
            params: null,
          },
          {
            code: "fanZhouKeyNode",
            name: "泛舟",
            sortId: null,
            configType: "DEV_CONFIG",
            params: null,
          },
          {
            code: "accessTokenMpH5KeyNode",
            name: "朋友圈H5 AccessToken",
            sortId: null,
            configType: "DEV_CONFIG",
            params: null,
          },
          {
            code: "callbackJGNode",
            name: "极光App回传",
            sortId: null,
            configType: "DEV_CONFIG",
            params: null,
          },
          {
            code: "callbackBaiduNode",
            name: "百度点击曝光回传",
            sortId: null,
            configType: "DEV_CONFIG",
            params: null,
          },
          {
            code: "weiBoCallbackNode",
            name: "微博回传",
            sortId: null,
            configType: "DEV_CONFIG",
            params: null,
          },
          {
            code: "callbackNode",
            name: "回传",
            sortId: null,
            configType: "DEV_CONFIG",
            params: null,
          },
          {
            code: "callbackZhNode",
            name: "知乎H5回传",
            sortId: null,
            configType: "DEV_CONFIG",
            params: null,
          },
          {
            code: "creditAmountFakeRelationNode",
            name: "信用额度与真假给额关系",
            sortId: null,
            configType: "BIZ_CONFIG",
            params: null,
          },
          {
            code: "enterpriseAuthNode",
            name: "企业认证",
            sortId: null,
            configType: "BIZ_CONFIG",
            params: null,
          },
          {
            code: "douYinKeyNode",
            name: "抖音原生信息流",
            sortId: null,
            configType: "BIZ_CONFIG",
            params: null,
          },
          {
            code: "callbackBaiduAssistNode",
            name: "百度助攻回传",
            sortId: null,
            configType: "DEV_CONFIG",
            params: null,
          },
          {
            code: "eventTypeLevelNode",
            name: "回传价值分层参数",
            sortId: null,
            configType: "DEV_CONFIG",
            params: null,
          },
        ],
      };
    },
  },
  // {
  //   urlReg: null,
  //   resultCbk: (url, type, body) => {}
  // },
];
