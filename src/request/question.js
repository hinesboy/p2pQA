import Cookies from 'js-cookie';

/* 提出问题 */
export const searchQuestion = (vm) => {
  vm.$axios.post('/api/query', {
    question: vm.question
  })
    .then(function (rep) {
      if (rep.status == 200) {
        vm.$Message.success("提问成功")
        vm.qaType='全部'
        getQuestionHistory(vm)
        vm.question = ''
      } else {
        vm.$Message.error(rep.data.detail)
      }
    })
    .catch(function (rep) {
      vm.$Message.error(rep.response.data.detail)
    })
}


/* 获取待回答问题 */
export const getQuestions = (vm) => {
  vm.$axios.get('/api/questions')
    .then(function (rep) {
      if (rep.status == 200) {
        vm.questions = rep.data.questions
      } else {
        vm.$Message.error(rep.data.detail)
      }
    })
    .catch(function (rep) {
      vm.$Message.error(rep.response.data.detail)
    })
}

/* 已提出问题列表 */
export const getQuestionHistory = (vm) => {
  vm.$axios.get('/api/querylist')
    .then(function (rep) {
      if (rep.status == 200) {
        vm.querylist = []
        if (rep.data.querylist) {
          vm.querylist = rep.data.querylist
          for (var i = 0; i < vm.querylist.length; i++) {
            if (vm.querylist[i].status) {
              getQuestionAnswer(vm, vm.querylist[i].questionid, i)
            } else {
              vm.querylist[i].answers = []
            }
          }
        }
      } else {
        vm.$Message.error(rep.data.detail)
      }
    })
    .catch(function (rep) {
      vm.$Message.error(rep.response.data.detail)
    })
}

/* 查询问题的答案 */

export const getQuestionAnswer = (vm, id, index) => {
  vm.$axios.post('/api/answers', {
    "questionid": id
  })
    .then(function (rep) {
      if (rep.status == 200) {
        if (rep.data.answers) {
          vm.$set(vm.querylist[index], "answers", rep.data.answers)
        }
      } else {
        vm.$Message.error(rep.data.detail)
      }
    })
    .catch(function (rep) {
      vm.$Message.error(rep.response.data.detail)
    })
}


/* 采纳答案 */
export const acceptAnswer = (vm, id, i) => {
  vm.$axios.post('/api/accept', {
    "answerid": id
  })
    .then(function (rep) {
      vm.$Message.success(rep.data.detail)
      if (rep.status == 200) {
        vm.$emit('acceptAnswer', vm.index, i)
      }
    })
    .catch(function (rep) {
      vm.$Message.error(rep.response.data.detail)
    })
}

/* 拒绝答案 */
export const rejectAnswer = (vm, id, i) => {
  vm.$axios.post('/api/reject', {
    "answerid": id
  })
    .then(function (rep) {
      vm.$Message.success(rep.data.detail)
      if (rep.status == 200) {
        vm.$emit('rejectAnswer', vm.index, i)
      }
    })
    .catch(function (rep) {
      vm.$Message.error(rep.response.data.detail)
    })
}


/* 提出问题 */
export const answerQuestion = (vm) => {
  vm.$axios.post('/api/answer', {
    questionid: vm.value.questionid,
    answer: vm.answer
  })
    .then(function (rep) {
      if (rep.status == 200) {
        vm.$Message.success("回答成功")
        vm.isAnswer = false
      } else {
        vm.$Message.error(rep.data.detail)
      }
    })
    .catch(function (rep) {
      vm.$Message.error(rep.response.data.detail)
    })
}


/* 获取已提交问题数量  被回答问题数量 */
export const getAmount = (vm) => {
  vm.$axios.get('/api/queryamount')
    .then(function (rep) {
      if (rep.status == 200) {
        vm.queries = rep.data.queries
        vm.answered = rep.data.answered
      } else {
        vm.$Message.error(rep.data.detail)
      }
    })
    .catch(function (rep) {
      vm.$Message.error(rep.response.data.detail)
    })
}