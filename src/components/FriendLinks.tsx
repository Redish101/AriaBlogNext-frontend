import "styles/FriendLinks.css";
import { FriendLink,FriendLinkGroup } from "interfaces/friendlink";
import HLJSNum from "components/thirdpartyjs/HLJSNum";
import CodeCopier from "components/thirdpartyjs/CodeCopier";
import { siteConfigs } from "@/config";
import Lazyload from "./thirdpartyjs/Lazyload";
import MDRenderer from "@/utils/mdrender";

export function FriendLinkItem({link}:{link:FriendLink}) {
    return (
        <a className="flink-item cf-friends-link" href={link.url} target="_blank" rel="noopener noreferrer" 
            style={{backgroundColor:link.color,color:"white"}}>
            <div className="flink-avatar" dangerouslySetInnerHTML={{
                __html:`<img class="flink-avatar-img lazy-img cf-friends-avatar" src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src=${link.avatar} alt=${link.name} 
                    onerror="this.src='${siteConfigs.falldownAvatar}'"/>`
            }}>
            </div>
            <span className="flink-name cf-friends-name">{link.name}</span>
            <span className="flink-desc">{link.description}</span>
        </a>
    );
}

export function FriendLinkGroupItem({group}:{group:FriendLinkGroup}) {
    return (<div className="flink-group">
        <h2>{group.name}</h2>
        <span>{group.description}</span>
        <div className="flink-group-item">
            {group.links.map((link)=><FriendLinkItem key={link.url} link={link}/>)}
        </div>
    </div>);
}

export default async function FriendLinks() {
    let flinks:FriendLinkGroup[]=[];
    const res=await fetch(`${siteConfigs.backEndUrl}/get/flink/flinks`,{next:{tags:["flinks"]}});
    if(res.ok){
        flinks=(await res.json()).data;
    }
    return (
        <div id="article-container" className="page flink">
            <div id="post-maincontent" className="page flink">
                <h1>友情链接</h1>
                <div id="flinks">
                    {flinks.map((group)=><FriendLinkGroupItem key={group.name} group={group}/>)}
                </div>
                <div dangerouslySetInnerHTML={{__html:await MDRenderer(
`# 我的信息
## Butterfly
\`\`\`YAML
- name: Ariasakaの小窝
    link: https://blog.yaria.top
    avatar: https://weavatar.com/avatar/795ce413eb6c7485954b78283ffa3e00
    descr: 人有悲欢离合 月有阴晴圆缺
    siteshot: https://vercel.yaria.top/img/siteshot.png
    theme_color: '#ed709b'
\`\`\`
## HTML
\`\`\`HTML
<a href="https://blog.yaria.top"><img src="https://weavatar.com/avatar/795ce413eb6c7485954b78283ffa3e00" alt="avatar">Ariasakaの小窝</a>
\`\`\`
# 如何申请友链？
咕咕咕。。。`)}}></div>
                <HLJSNum/>
                <CodeCopier/>
                <Lazyload/>
            </div>
        </div>
    );
}