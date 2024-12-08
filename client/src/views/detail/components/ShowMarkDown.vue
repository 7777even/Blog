<template>
  <div class="text" v-if="content !== ''">
    <mavon-editor
      v-model="text"
      :ishljs="true"
      :toolbarsFlag="false"
      :editable="false"
      :subfield="false"
      defaultOpen="preview"
      codeStyle="tomorrow-night-eighties"
      class="md"
      ref="md"
    />
  </div>
</template>

<script>
import $ from "jquery";
import Clipboard from 'clipboard';
export default {
  name: "ShowMarkDown",
  props: {
    content: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      text: "",
    };
  },
  mounted() {
    this.text = this.content;
  },
  updated() {
    setTimeout(() => {
      for (let i = 0; i < $(".hljs").length; i++) {
        let str = $(".hljs")[i].innerText
        let div = document.createElement('div')
        div.innerHTML = 'copy'
        div.className = 'copy'
        div.setAttribute('data-clipboard-text', str)
        $('.hljs')[i].append(div)
      }

      new Clipboard('.copy')
    }, 500);
  },
};
</script>




<style scoped>
.text >>> .v-note-wrapper {
  min-height: 0 !important;
}
.text >>> .v-show-content {
  padding-bottom: 8px !important;
}
.text >>> .markdown-body pre {
  margin-bottom: 0;
}
.text >>> h1,
.text >>> h2,
.text >>> h3,
.text >>> h4,
.text >>> h5,
.text >>> h6 {
  color: #222;
}

.text >>> p {
  color: #222;
  margin: 10px 0;
}
.text >>> pre {
  position: relative;
  overflow: hidden;
  overflow-x: auto;
  padding: 5px 0 5px 10px;
}

.text >>> .copy {
  position: absolute;
  padding: 2px;
  background-color: #666;
  top: 0;
  right: 5px;
  border-radius: 4px;
  cursor: pointer;
}
</style>