import Taro, { Component } from '@tarojs/taro'
import { View, RichText, Image } from '@tarojs/components'
import Thd from '../../components/thread'
import Loading from '../../components/loading'
import { Thread } from '../../interfaces/thread'
import api from '../../utils/api'
import { timeagoInst, GlobalState, ThreadProps } from '../../utils'

import './index.scss'

interface State {
  loading: boolean
  replies: Thread[],
  content: string,
  thread: ThreadProps
}

function prettyHTML (str: string) {
  const lines = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']

  lines.forEach(line => {
    const regex = new RegExp(`<${line}`, 'gi')

    str = str.replace(regex, `<${line} class="line"`)
  })

  return str.replace(/<img/gi, '<img class="img"')
}

class ThreadDetail extends Component<{}, State> {
  state = {
    loading: true,
    replies: [],
    content: '',
    thread: {} as ThreadProps
  } as State

  config = {
    navigationBarTitleText: '话题'
  }

  componentWillMount () {
    this.setState({
      thread: GlobalState.thread
    })
  }

  async componentDidMount () {
    try {
      const id = GlobalState.thread.tid
      const [{ data }, { data: [ { content_rendered } ] } ] = await Promise.all([
        Taro.request<Thread[]>({
          url: api.getReplies({
            'topic_id': id
          }),
          mode: 'cors'
        }),
        Taro.request<Thread[]>({
          url: api.getTopics({
            id
          })
        })
      ])
      this.setState({
        loading: false,
        replies: data,
        content: prettyHTML(content_rendered)
      })
    } catch (error) {
      Taro.showToast({
        title: '载入远程数据错误'
      })
    }
  }

  render () {
    const { loading, replies, thread, content } = this.state

    const replieEl = replies.map((reply, index) => {
      const time = timeagoInst.format(reply.last_modified * 1000, 'zh')
      return (
        <View className='reply' key={reply.id}>
          <Image src={reply.member.avatar_large} className='avatar' />
          <View className='main'>
            <View className='author'>
              {reply.member.username}
            </View>
            <View className='time'>
              {time}
            </View>
            {Taro.getEnv() === Taro.ENV_TYPE.ALIPAY
            ? <View className='content'>{reply.content}</View>
            : <RichText nodes={reply.content} className='content' />
            }
            <View className='floor'>
              {index + 1} 楼
            </View>
          </View>
        </View>
      )
    })

    const contentEl = loading
      ? <Loading />
      : (
        <View>
          <View className='main-content'>
          {Taro.getEnv() === Taro.ENV_TYPE.ALIPAY
            ? <View>{content}</View>
            : <RichText nodes={content} />
          }
          </View>
          <View className='replies'>
            {replieEl}
          </View>
        </View>
      )

    return (
      <View className='detail'>
        <Thd
          node={thread.node}
          title={thread.title}
          last_modified={thread.last_modified}
          replies={thread.replies}
          tid={thread.id}
          member={thread.member}
          not_navi={true}
        />
        {contentEl}
      </View>
    )
  }
}

export default ThreadDetail
