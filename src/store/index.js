import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    progress: 0,
    uploadStatus: false,
    fileSize: 0,
    resultStatus: '',
  },
  actions: {
    makeFileSize(context, file) {
      context.commit('uploadFile', file);
    },
    cancel(context, message) {
      context.commit('cancelUpload', message);
    },
    progress(context) {
      const oneMB = 1048576;
      const file = context.state.fileSize;
      // выделяем количество целых чанков
      const wholeChunks = Math.floor(file / oneMB);
      // процент объема относительно всего веса файла для целого чанка
      const percentChunk = (oneMB / file) * 100;
      // процент остатка
      const remainderPercent = ((file - (wholeChunks * oneMB)) / file) * 100;
      let percentResult = 0;
      function percentSum(chunkCount) { // функция для заполнения прогрессбара
        if (chunkCount <= wholeChunks) percentResult += percentChunk;
        else percentResult += remainderPercent;
        if (context.state.progress > 99.99) percentResult = 100;
        context.commit('progressMutation', percentResult);
        return percentResult;
      }
      function myPromise() { // имитация загрузки с шансом отклонения
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            if (Math.random() < 0.79) resolve(true);
            else reject(new Error('error'));
          }, 100);
        });
      }

      function recursion(counter) { // рекурсивная функция заполнения шкалы прогрессбара
        let x = counter;
        if (context.state.resultStatus === '') {
          myPromise().then(() => {
            percentSum(x);
            if (x !== wholeChunks + 1) {
              x += 1;
              recursion(x);
            } else context.commit('progressFinished', 'File has been successfully uploaded');
          })
            .catch(() => {
              if (x !== wholeChunks + 1) recursion(x);
              // ниже вариант реджекта с ошибкой (не вызываем функцию, а отправляем назад)
              // if (context.state.resultStatus === '') {
              //     context.commit('progressFailed', 'File has not been uploaded ;(');
              // }
              // else context.commit('progressFailed', context.state.resultStatus);
            });
        } else recursion(x);
      }
      recursion(1);
    },
  },
  mutations: {
    uploadFile(state, fileSize) {
      state.fileSize = fileSize;
      state.uploadStatus = true;
      state.resultStatus = '';
      state.progress = 0;
    },
    cancelUpload(state, message) {
      state.uploadStatus = false;
      state.fileSize = 0;
      state.resultStatus = message;
      state.progress = 0;
    },
    progressMutation(state, info) {
      state.progress = info;
    },
    progressFinished(state, message) {
      state.progress = 100;
      state.resultStatus = message;
      state.uploadStatus = false;
    },
    progressFailed(state, message) {
      state.progress = 0;
      state.fileSize = 0;
      state.resultStatus = message;
      state.uploadStatus = false;
    },
  },
  getters: { // аналог useSelector React
    getSize(state) {
      return state.fileSize;
    },
    getUploadStatus(state) {
      return state.uploadStatus;
    },
    getProgress(state) {
      return state.progress;
    },
    getResultStatus(state) {
      return state.resultStatus;
    },
  },
});
