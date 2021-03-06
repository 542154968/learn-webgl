import { createComponent, onMounted } from "@vue/composition-api";

const reservedWord = `break do instanceof typeof 
case else new var 
catch finally return void 
continue for switch while 
debugger\* function this with 
default if throw 
delete in try let const`;
const reservedRegExp = new RegExp(
  `(${reservedWord.replace(/\s+/g, "|")})(?= +|;|&nbsp;)`,
  "g"
);
// 匹配保留字
function formtReservedWord(text: string = "") {
  return text.replace(reservedRegExp, '<span class="hljs-keyword">$1</span>');
}

// 匹配引号间的内容
function formatQuotes(text: string = "") {
  return text.replace(
    /(&quot|&#39)(.*)?(?=&quot|&#39)/g,
    '$1<span class="hljs-string">$2</span>'
  );
}

// 匹配非引号间的数字
function formatNum(text: string) {
  return text.replace(
    /\b(\d+(\.\d+)?)(?=,| |;|\))/g,
    '<span class="hljs-number">$1</span>'
  );
}

// 匹配敏感字符 避免执行了代码
function decodingFormat(text: string) {
  return text
    .replace(/</g, "&lt")
    .replace(/>/g, "&gt")
    .replace(/"/g, "&quot")
    .replace(/'/g, "&#39");
  // .replace(/\n|\r/g, "\n")
  // .replace(/ /g, "&nbsp;");
}

// 匹配//注释
function formatNotes(text: string) {
  return text.replace(
    /(\/\/(&nbsp;)?.+)(?=\n)/g,
    '<span class="hljs-comment">$1</span>'
  );
}

// 匹配``之间的
function formatBackquote(text: string) {
  return text.replace(
    /(?:`)([^`]*)?(?=`\s*;)/g,
    '`<span class="hljs-string">$1</span>'
  );
}

// 匹配方法名
function formatFunctionName(text: string) {
  return text.replace(
    /(\.|function )(\w+)(?=\()/g,
    '$1<span class="hljs-attribute">$2</span>'
  );
}

// 匹配类型
function formatArgsType(text: string) {
  return text.replace(
    /(:\s+)([a-z]+)(?=\b)/gi,
    '$1<span class="hljs-type">$2</span>'
  );
}

export default createComponent({
  props: {
    code: {
      default: "",
      type: String
    }
  },
  setup(props: { code: string }, { refs }) {
    onMounted(() => {
      refs.codeContain.innerHTML = formatCode(props.code);
    });

    function formatCode(code: string) {
      return formatNotes(
        formtReservedWord(
          formatArgsType(
            formatFunctionName(
              formatNum(formatBackquote(formatQuotes(decodingFormat(code))))
            )
          )
        )
      );
    }

    return () => (
      <pre class="custom">
        <code class="hljs" ref="codeContain"></code>
      </pre>
    );
  }
});
