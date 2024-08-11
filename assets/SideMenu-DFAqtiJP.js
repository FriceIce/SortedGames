import{u as p,b as g,e as h,j as e,L as f,R as m,c as w}from"./index-CB2Yse53.js";import{M as y}from"./MenuOptions-CCoUmMrQ.js";const t="/SortedGames/images/thumbnails/thumbnail-",$=[{src:`${t}valorant.jpg`,title:"Popular"},{src:`${t}open_world.jpg`,title:"Open world"},{src:`${t}battle-royale.jpg`,title:"Battle Royale"},{src:`${t}MMORPG.jpg`,title:"MMORPG"},{src:`${t}shooter.jpg`,title:"Shooter"},{src:`${t}sports.jpg`,title:"Sports"},{src:`${t}MOBA.jpg`,title:"MOBA"},{src:`${t}anime.jpg`,title:"Anime"},{src:`${t}zombie.jpg`,title:"Zombie"},{src:`${t}horror.jpg`,title:"Horror"},{src:`${t}fighting.jpg`,title:"Fighting"},{src:`${t}card-games.jpg`,title:"Card Games"},{src:`${t}fantasy.jpg`,title:"Fantasy"},{src:`${t}sci-fi.jpg`,title:"Sci-Fi"}],b=({genresState:a})=>{const n=p(s=>s.sidemenu.sidemenu),l=g(),c=h("(min-width: 1024px)"),r=()=>{document.body.style.overflow="auto",c||l({type:"sidemenu/setOpenSidemenu",payload:!n})};return e.jsx("div",{className:`grid ${a?"grid-rows-[1fr] mt-2":"grid-rows-[0fr]"} ml-2 transition-all duration-300 ease-out`,children:e.jsx("ul",{className:"space-y-3 overflow-hidden min-h-0",children:$.map(s=>{const d=s.title.toLocaleLowerCase()==="open world"||s.title.toLocaleLowerCase()==="battle royale"?s.title.replace(" ","-"):s.title.replace(" ","&");return e.jsx("li",{children:e.jsxs(f,{to:`/SortedGames/genre/${d.toLowerCase()}`,className:"flex items-center gap-4",onClick:r,children:[e.jsx("img",{src:s.src,alt:"genre.genre",className:"size-[54px] rounded-xl object-cover object-center"}),e.jsx("p",{className:"font-normal text-sm",children:s.title})]})},s.title)})})})},L=()=>{const[a,n]=m.useState(!0),[l,c]=m.useState(!1),r=p(o=>o.sidemenu.sidemenu),{user:s}=p(o=>o.user),d=g(),j=w(),i=h("(min-width: 1024px)"),x=window.location.pathname;return m.useEffect(()=>{const o=document.getElementById("sub_root"),u=document.body;r&&!i&&(u.style.overflow="hidden",o.style.overflowY="hidden"),r||(u.style.overflow="auto",o.style.overflowY="auto")},[r]),e.jsx("aside",{className:`fixed inset-0 z-[1] h-full bg-[#101720f6] text-white rounded-tr-md ${i?"pt-[120px]":"pt-[90px]"} ${i?"w-max":"w-full"} left-[-100%] transition-all duration-200 overflow-y-auto pb-2 hide-scrollbar ${r&&"left-[0]"}`,children:e.jsxs("div",{className:"p-4 space-y-6",children:[!i&&e.jsx(y,{desktop:i,profileList:l,user:s,dispatch:d,navigate:j,setOpenProfileList:c}),e.jsx("div",{className:`w-max pr-2 ${x==="/genre/"&&"border-b-2 border-white"}`,children:e.jsxs("div",{className:`${i&&"mt-4"}`,children:[e.jsxs("div",{className:"flex items-center gap-2",onClick:()=>n(o=>!o),children:[e.jsx("img",{src:"/SortedGames/icons/genres-icon.svg",alt:"Genre Icon as an Atom",className:"size-6 sm:size-[28px]"}),e.jsx("p",{children:"Genres"}),!i&&e.jsx("img",{src:"/SortedGames/icons/polygon.svg",alt:"Polygon icon",className:`size-2 transition-all duration-300 ${!a&&"rotate-[-180deg]"}`})]}),e.jsx(b,{genresState:a})]})})]})})};export{L as default};
