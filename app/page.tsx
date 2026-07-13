"use client";

import { useMemo, useState } from "react";

type Status = "Confirmed" | "Expected" | "Watch";
type EventItem = {
  id: number; date: string; short: string; title: string; org: string;
  level: "National" | "State Chapter" | "Local Chapter" | "Partner Organization";
  type: "Conference" | "Awards" | "Call for Sessions" | "Registration" | "Webinar" | "Workshop" | "Tour" | "Networking";
  status: Status; note: string; url: string;
};

const events: EventItem[] = [
  { id: 1, date: "2026-07-10", short: "AZ: Awards", title: "APA Arizona Planning Awards — entries due", org: "APA Arizona", level: "State Chapter", type: "Awards", status: "Confirmed", note: "Official chapter deadline", url: "https://arizona.planning.org/conference-events/" },
  { id: 2, date: "2026-07-20", short: "APA: Sessions", title: "National Planning Conference — call for sessions", org: "American Planning Association", level: "National", type: "Call for Sessions", status: "Expected", note: "Projected from the recent annual cycle", url: "https://www.planning.org/conference/" },
  { id: 3, date: "2026-07-24", short: "CA: Early Reg.", title: "APA California Conference — early registration", org: "APA California", level: "State Chapter", type: "Registration", status: "Expected", note: "Watch window based on prior years", url: "https://www.apacalifornia.org/" },
  { id: 4, date: "2026-07-28", short: "PA: Awards", title: "APA Pennsylvania Awards — nominations", org: "APA Pennsylvania", level: "State Chapter", type: "Awards", status: "Watch", note: "Likely summer nomination window", url: "https://planningpa.org/" },
  { id: 5, date: "2026-07-31", short: "OH: Awards", title: "Great Places Awards — nominations close", org: "APA Ohio", level: "State Chapter", type: "Awards", status: "Watch", note: "Estimated from the chapter’s typical cycle", url: "https://ohioplanning.org/" },
  { id: 6, date: "2026-08-07", short: "NY: Proposals", title: "New York Metro Chapter Conference — proposal window", org: "APA New York Metro", level: "Local Chapter", type: "Call for Sessions", status: "Expected", note: "Expected opening; official date not posted", url: "https://www.nyplanning.org/" },
  { id: 13, date: "2026-07-15", short: "OR: Housing", title: "Goal 10: Understanding Local Housing and Land Needs", org: "APA Oregon / DLCD", level: "State Chapter", type: "Webinar", status: "Confirmed", note: "Live online event", url: "https://oregon.planning.org/" },
  { id: 14, date: "2026-07-21", short: "OR: Urban Design", title: "Reparative Development: The Williams & Russell Project", org: "APA Oregon Urban Design Panel", level: "State Chapter", type: "Webinar", status: "Confirmed", note: "Live online event", url: "https://oregon.planning.org/" },
  { id: 15, date: "2026-07-29", short: "OR: Housing", title: "Goal 10: Taking Action and Tracking Housing Progress", org: "APA Oregon / DLCD", level: "State Chapter", type: "Webinar", status: "Confirmed", note: "Live online event", url: "https://oregon.planning.org/" },
  { id: 16, date: "2026-08-05", short: "OR: Book Club", title: "Bridging a Great Divide: The Battle for the Columbia River Gorge", org: "APA Oregon", level: "State Chapter", type: "Networking", status: "Confirmed", note: "Online chapter book club", url: "https://oregon.planning.org/" },
  { id: 7, date: "2026-08-26", short: "Western Planner", title: "Western Planner Conference", org: "Western Planner / APA Arizona", level: "State Chapter", type: "Conference", status: "Confirmed", note: "August 26–28, 2026", url: "https://arizona.planning.org/conference-events/" },
  { id: 8, date: "2026-09-28", short: "NCAC: Conf.", title: "National Capital Area Annual Planning Conference", org: "APA National Capital Area", level: "Local Chapter", type: "Conference", status: "Confirmed", note: "National Press Club, Washington, DC", url: "https://ncac.planning.org/" },
  { id: 9, date: "2026-10-19", short: "NM: Conference", title: "APA New Mexico State Conference", org: "APA New Mexico", level: "State Chapter", type: "Conference", status: "Confirmed", note: "October 19–21, 2026 · Santa Fe", url: "https://newmexico.planning.org/" },
  { id: 10, date: "2026-10-21", short: "MN: Conference", title: "APA Minnesota Planning Conference", org: "APA Minnesota", level: "State Chapter", type: "Conference", status: "Confirmed", note: "October 21–23, 2026 · Mankato", url: "https://minnesota.planning.org/conferences-and-meetings/" },
  { id: 11, date: "2026-11-04", short: "AZ: Conference", title: "APA Arizona State Planning Conference", org: "APA Arizona", level: "State Chapter", type: "Conference", status: "Confirmed", note: "November 4–5, 2026 · Flagstaff", url: "https://arizona.planning.org/conference-events/2026-state-planning-conference/" },
  { id: 17, date: "2026-10-22", short: "NV: Conference", title: "APA Nevada State Planning Conference", org: "APA Nevada", level: "State Chapter", type: "Conference", status: "Confirmed", note: "October 22–23, 2026 · Henderson", url: "https://nevada.planning.org/aicp-certification/training-and-webinars/" },
  { id: 18, date: "2026-07-16", short: "Strong Towns", title: "Downtown Matters Conference", org: "Strong Towns", level: "Partner Organization", type: "Conference", status: "Confirmed", note: "Flagstaff, Arizona", url: "https://www.strongtowns.org/attend-event" },
  { id: 19, date: "2026-08-13", short: "ULI Austin", title: "Why ULI? Information Session", org: "ULI Austin", level: "Partner Organization", type: "Networking", status: "Confirmed", note: "Online information session · 8:30–9:30 a.m. CT", url: "https://austin.uli.org/" },
  { id: 20, date: "2026-08-19", short: "ULI: Breakfast", title: "ULI Austin August Breakfast", org: "ULI Austin", level: "Partner Organization", type: "Networking", status: "Confirmed", note: "Austin, Texas", url: "https://austin.uli.org/" },
  { id: 21, date: "2026-09-17", short: "Strong Towns", title: "Clever Communities Workshop", org: "Strong Towns", level: "Partner Organization", type: "Workshop", status: "Confirmed", note: "Dallas, Texas · 8:30 a.m. CT", url: "https://www.strongtowns.org/attend-event" },
  { id: 22, date: "2026-09-30", short: "IL: Conference", title: "APA Illinois State Conference", org: "APA Illinois", level: "State Chapter", type: "Conference", status: "Confirmed", note: "September 30–October 2 · Evanston, Illinois", url: "https://www.ilapa.org/aws/APAIL/pt/sp/state-conference" },
  { id: 23, date: "2026-10-08", short: "WI: Conference", title: "APA Wisconsin Annual Conference", org: "APA Wisconsin", level: "State Chapter", type: "Conference", status: "Confirmed", note: "October 8–9 · UW–Madison Memorial Union", url: "https://wisconsin.planning.org/conferences-and-events/" },
  { id: 24, date: "2026-07-24", short: "IL: Coffee + Book Club", title: "APA-STL Coffee Meetup & Book Club", org: "APA Illinois / APA St. Louis", level: "Local Chapter", type: "Networking", status: "Confirmed", note: "8–9 AM CT · Panera Bread, Richmond Heights, Missouri", url: "https://www.ilapa.org/aws/APAIL/pt/sp/events" },
  { id: 25, date: "2026-07-29", short: "IL: Site Plan Workshop", title: "Let's Bake a Site Plan! Site Plan Design + Review Workshop", org: "APA Illinois", level: "State Chapter", type: "Workshop", status: "Confirmed", note: "2–5 PM CT · CMAP, Chicago · 3 CM · Register by July 26", url: "https://www.ilapa.org/aws/APAIL/pt/sp/events" },
  { id: 26, date: "2026-07-29", short: "IL: Local Govapalooza", title: "Local Govapalooza Mini Golf & Drinks", org: "APA Illinois", level: "State Chapter", type: "Networking", status: "Confirmed", note: "6–9 PM CT · Pioneer Park, Niles / Park Ridge", url: "https://www.ilapa.org/aws/APAIL/pt/sp/events" },
  { id: 27, date: "2026-08-06", short: "APA: AICP Office Hours", title: "AICP Office Hours", org: "American Planning Association", level: "National", type: "Webinar", status: "Confirmed", note: "Noon–1 PM CT · Virtual", url: "https://www.ilapa.org/aws/APAIL/pt/sp/events" },
  { id: 28, date: "2026-09-09", short: "APA: AICP Office Hours", title: "AICP Office Hours", org: "American Planning Association", level: "National", type: "Webinar", status: "Confirmed", note: "2–3 PM CT · Virtual", url: "https://www.ilapa.org/aws/APAIL/pt/sp/events" },
  { id: 29, date: "2026-09-09", short: "MT + ID: Conference", title: "Joint Montana & Idaho Chapter Conference", org: "APA Montana / APA Idaho", level: "State Chapter", type: "Conference", status: "Confirmed", note: "September 9–11 · University of Montana Western · Dillon, Montana", url: "https://mtplanners.org/conference/montana-association-of-planners-2026-annual-conference/" },
  { id: 30, date: "2026-09-29", short: "AL + MS: Conference", title: "Deep South Planning Conference", org: "APA Alabama / APA Mississippi", level: "State Chapter", type: "Conference", status: "Confirmed", note: "September 29–October 1 · Auburn, Alabama", url: "https://alabamaplanning.org/events/list/" },
  { id: 31, date: "2026-07-15", short: "GA: Session Proposals", title: "Fall Conference Session Proposals Due", org: "APA Georgia", level: "State Chapter", type: "Call for Sessions", status: "Confirmed", note: "Conference session submission deadline", url: "https://georgiaplanning.org/" },
  { id: 32, date: "2026-07-17", short: "GA: Awards", title: "Chapter Award Nominations Due", org: "APA Georgia", level: "State Chapter", type: "Awards", status: "Confirmed", note: "Georgia Planning Association awards deadline", url: "https://georgiaplanning.org/" },
  { id: 33, date: "2026-07-30", short: "GA: EPG Social", title: "Emerging Planners July Ice Cream Social", org: "APA Georgia", level: "State Chapter", type: "Networking", status: "Confirmed", note: "6–8 PM · Georgia", url: "https://georgiaplanning.org/" },
  { id: 34, date: "2026-08-19", short: "GA: Incentives", title: "Leveraging Incentives for Economic Impact", org: "APA Georgia", level: "State Chapter", type: "Workshop", status: "Confirmed", note: "One-day advanced topic class · Warner Robins", url: "https://georgiaplanning.org/" },
  { id: 35, date: "2026-09-23", short: "GA: Conference", title: "Georgia Planning Association Fall Conference", org: "APA Georgia", level: "State Chapter", type: "Conference", status: "Confirmed", note: "September 23–25 · Augusta, Georgia", url: "https://georgiaplanning.org/aicp-cm-opportunities/" },
  { id: 36, date: "2026-07-24", short: "MN: Baseball Night", title: "APA Minnesota Baseball Night", org: "APA Minnesota", level: "State Chapter", type: "Networking", status: "Confirmed", note: "CHS Field · Saint Paul · Registration required", url: "https://minnesota.planning.org/" },
  { id: 37, date: "2026-07-28", short: "MI: Transportation", title: "Michigan Transportation Planning Association Conference", org: "APA Michigan", level: "State Chapter", type: "Conference", status: "Confirmed", note: "July 28–31 · Port Huron", url: "https://www.planningmi.org/aws/MAP/pt/sp/events" },
  { id: 38, date: "2026-07-29", short: "MI: AICP Prep 1", title: "AICP Exam Prep Part 1: Essentials and What to Expect", org: "APA Michigan", level: "State Chapter", type: "Workshop", status: "Confirmed", note: "Noon–1 PM ET · Virtual", url: "https://www.planningmi.org/aws/MAP/pt/sp/events" },
  { id: 39, date: "2026-07-31", short: "MI: Scholarship", title: "Asset Management Champions Program Scholarship Deadline", org: "APA Michigan", level: "State Chapter", type: "Registration", status: "Confirmed", note: "Application deadline", url: "https://www.planningmi.org/aws/MAP/pt/sp/events" },
  { id: 40, date: "2026-08-04", short: "MI: Housing Forum", title: "Affordable Housing Forum: LIHTC and the QAP", org: "APA Michigan", level: "State Chapter", type: "Workshop", status: "Confirmed", note: "Lansing, Michigan", url: "https://www.planningmi.org/aws/MAP/pt/sp/events" },
  { id: 41, date: "2026-08-05", short: "MI: MAP Reads", title: "MAP Reads — Detroit", org: "APA Michigan", level: "State Chapter", type: "Networking", status: "Confirmed", note: "5:30–7 PM · Detroit", url: "https://www.planningmi.org/aws/MAP/pt/sp/events" },
  { id: 42, date: "2026-08-06", short: "MI: MAP Reads", title: "MAP Reads — Grand Rapids", org: "APA Michigan", level: "State Chapter", type: "Networking", status: "Confirmed", note: "5:30–7 PM · Grand Rapids", url: "https://www.planningmi.org/aws/MAP/pt/sp/events" },
  { id: 43, date: "2026-08-20", short: "MI: Summer Social", title: "Michigan Black Professional Planners Summer Social BBQ", org: "APA Michigan", level: "State Chapter", type: "Networking", status: "Confirmed", note: "6–8 PM ET · Belle Isle Park, Detroit", url: "https://www.planningmi.org/aws/MAP/pt/sp/events" },
  { id: 44, date: "2026-08-26", short: "MI: AICP Prep 2", title: "AICP Exam Prep Part 2: Strategies and Mock Questions", org: "APA Michigan", level: "State Chapter", type: "Workshop", status: "Confirmed", note: "Noon–1 PM ET · Virtual", url: "https://www.planningmi.org/aws/MAP/pt/sp/events" },
  { id: 45, date: "2026-09-16", short: "MI: Safe Routes", title: "Safe Routes to School Regional Training — Marquette", org: "APA Michigan", level: "State Chapter", type: "Workshop", status: "Confirmed", note: "10 AM–3:30 PM · Marquette", url: "https://www.planningmi.org/aws/MAP/pt/sp/events" },
  { id: 46, date: "2026-09-17", short: "MI: Safe Routes", title: "Safe Routes to School Regional Training — Gaylord", org: "APA Michigan", level: "State Chapter", type: "Workshop", status: "Confirmed", note: "9:30 AM–3 PM · Gaylord", url: "https://www.planningmi.org/aws/MAP/pt/sp/events" },
  { id: 47, date: "2026-09-30", short: "MI: Conference", title: "Planning Michigan 2026", org: "APA Michigan", level: "State Chapter", type: "Conference", status: "Confirmed", note: "September 30–October 2 · Kalamazoo", url: "https://www.planningmi.org/aws/MAP/pt/sp/events" },
  { id: 48, date: "2026-07-31", short: "NYU: Early Registration", title: "Upstate New York Conference Early Registration Deadline", org: "APA New York Upstate", level: "State Chapter", type: "Registration", status: "Confirmed", note: "Early registration closes July 31", url: "https://www.nyupstateplanning.org/2026-annual-conference" },
  { id: 49, date: "2026-10-14", short: "NYU: Conference", title: "Upstate Renaissance Annual Chapter Conference", org: "APA New York Upstate", level: "State Chapter", type: "Conference", status: "Confirmed", note: "October 14–16 · Albany, New York", url: "https://www.nyupstateplanning.org/2026-annual-conference" },
  { id: 12, date: "2027-05-15", short: "APA: NPC", title: "National Planning Conference", org: "American Planning Association", level: "National", type: "Conference", status: "Confirmed", note: "May 15–18, 2027 · Houston, Texas", url: "https://www.planning.org/conference/" },
];

const chapters = [
  ["Alabama","https://www.alabamaplanning.org"],["Alaska","https://www.akplanning.org"],["Arizona","https://www.azplanning.org"],["Arkansas","https://arkansas.planning.org"],
  ["California","https://www.apacalifornia.org"],["Colorado","https://colorado.planning.org"],["Connecticut","https://ct.planning.org"],["Delaware","https://delawareapa.wpcomstaging.com"],
  ["Florida","https://florida.planning.org"],["Georgia","https://www.georgiaplanning.org"],["Hawaii","https://hawaii.planning.org"],["Idaho","https://idaho.planning.org"],
  ["Illinois","https://www.ilapa.org"],["Indiana","https://indiana.planning.org"],["Iowa","https://iowa.planning.org"],["Kansas","https://kansas.planning.org"],
  ["Kentucky","https://www.apaky.org"],["Louisiana","https://louisiana.planning.org"],["Maryland","https://www.apamaryland.org"],["Massachusetts","https://www.apa-ma.org"],
  ["Michigan","https://www.planningmi.org"],["Minnesota","https://minnesota.planning.org"],["Mississippi","https://www.apamississippi.com"],["Missouri","https://missouri.planning.org"],
  ["Montana","https://mtplanners.org"],["National Capital Area","https://ncac.planning.org"],["Nebraska","https://nebraska.planning.org"],["Nevada","https://nevada.planning.org"],
  ["New Jersey","https://www.njplanning.org"],["New Mexico","https://newmexico.planning.org"],["New York Metro","https://www.nyplanning.org"],["New York Upstate","https://www.nyupstateplanning.org"],
  ["North Carolina","https://northcarolina.planning.org"],["Northern New England","https://www.nnecapa.org"],["Ohio","https://www.ohioplanning.org"],["Oklahoma","https://ok.planning.org"],
  ["Oregon","https://oregon.planning.org"],["Pennsylvania","https://planningpa.org"],["Rhode Island","https://ri.planning.org"],["South Carolina","https://www.scapa.org"],
  ["Tennessee","https://tennessee.planning.org"],["Texas","https://texas.planning.org"],["Utah","https://apautah.org"],["Virginia","https://virginia.planning.org"],
  ["Washington","https://www.washington-apa.org"],["West Virginia","https://wv.planning.org"],["Western Central","https://wcc.planning.org"],["Wisconsin","https://wisconsin.planning.org"],
] as const;

const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const weekdays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

function Icon({ name }: { name: "search" | "left" | "right" | "calendar" }) {
  const paths = { search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>, left: <path d="m15 18-6-6 6-6"/>, right: <path d="m9 18 6-6-6-6"/>, calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></> };
  return <svg viewBox="0 0 24 24" aria-hidden="true"><g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</g></svg>;
}

export default function Home() {
  const [month, setMonth] = useState(6);
  const [year, setYear] = useState(2026);
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState("All organizations");
  const [type, setType] = useState("All event types");
  const [status, setStatus] = useState("All statuses");
  const [chapterQuery, setChapterQuery] = useState("");

  const filtered = useMemo(() => events.filter(e => {
    const haystack = `${e.title} ${e.org} ${e.type}`.toLowerCase();
    return haystack.includes(query.toLowerCase()) && (level === "All organizations" || e.level === level) && (type === "All event types" || e.type === type) && (status === "All statuses" || e.status === status);
  }), [query, level, type, status]);

  const cells = useMemo(() => {
    const first = new Date(year, month, 1).getDay();
    const count = new Date(year, month + 1, 0).getDate();
    const prior = new Date(year, month, 0).getDate();
    const totalCells = Math.ceil((first + count) / 7) * 7;
    return Array.from({length: totalCells}, (_, i) => {
      const n = i - first + 1;
      const d = n < 1 ? prior + n : n > count ? n - count : n;
      const outside = n < 1 || n > count;
      const cellDate = outside ? null : `${year}-${String(month + 1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
      return { d, outside, events: filtered.filter(e => e.date === cellDate) };
    });
  }, [year, month, filtered]);

  const moveMonth = (dir: number) => { const date = new Date(year, month + dir, 1); setYear(date.getFullYear()); setMonth(date.getMonth()); };
  const upcoming = [...filtered].filter(e => e.date >= "2026-07-13").sort((a,b) => a.date.localeCompare(b.date)).slice(0, 8);
  const midwest = events.filter(e => e.org.includes("APA Illinois") || e.org.includes("APA Wisconsin"));
  const visibleChapters = chapters.filter(([name]) => name.toLowerCase().includes(chapterQuery.toLowerCase()));
  const chapterEventCount = (name: string) => events.filter(e => e.org.toLowerCase().includes(name.toLowerCase()) || (name === "Montana" && e.org.includes("Montana")) || (name === "Idaho" && e.org.includes("Idaho"))).length;

  return <main>
    <header className="topbar"><a className="brand" href="#top"><span className="brandIcon"><Icon name="calendar"/></span><span>Planning Events</span></a><span className="refreshNote"><i/>Updated every two weeks</span></header>
    <section className="hero" id="top">
      <div><span className="heroLabel">For planners</span><h1>What’s happening<br/>in planning.</h1><p className="lede">Conferences, awards, workshops, webinars, tours, and calls for sessions from APA and other planning organizations.</p><div className="updated">{events.length} events · Last checked July 13, 2026</div></div>
    </section>
    <section className="controls" aria-label="Calendar filters">
      <label className="search"><Icon name="search"/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search conferences, awards, chapters…" aria-label="Search events"/></label>
      <select value={level} onChange={e=>setLevel(e.target.value)} aria-label="Organization level"><option>All organizations</option><option>National</option><option>State Chapter</option><option>Local Chapter</option><option>Partner Organization</option></select>
      <select value={type} onChange={e=>setType(e.target.value)} aria-label="Event type"><option>All event types</option><option>Conference</option><option>Awards</option><option>Call for Sessions</option><option>Registration</option><option>Webinar</option><option>Workshop</option><option>Tour</option><option>Networking</option></select>
      <select value={status} onChange={e=>setStatus(e.target.value)} aria-label="Status"><option>All statuses</option><option>Confirmed</option><option>Expected</option><option>Watch</option></select>
    </section>
    <div className="legend"><span><i className="confirmed"/>Confirmed</span><span><i className="expected"/>Expected</span><span><i className="watch"/>Watch</span><small>Expected dates are projections, not official deadlines.</small></div>
    <section className="workspace" id="calendar">
      <div className="calendarPanel">
        <div className="monthHead"><button onClick={()=>moveMonth(-1)} aria-label="Previous month"><Icon name="left"/></button><h2>{months[month]} {year}</h2><div className="monthActions"><button className="todayButton" onClick={()=>{setMonth(6);setYear(2026)}}>Today</button><button onClick={()=>moveMonth(1)} aria-label="Next month"><Icon name="right"/></button></div></div>
        <div className="weekdays">{weekdays.map(d=><span key={d}>{d}</span>)}</div>
        <div className="grid">{cells.map((c,i)=><div className={`day ${c.outside?"outside":""}`} key={i}><span className={c.d===13&&month===6&&year===2026?"today":""}>{c.d}</span><div className="dayEvents">{c.events.map(event=><a key={event.id} href={event.url} target="_blank" rel="noreferrer" className={`eventPill ${event.status.toLowerCase()}`} title={event.title}>{event.short}</a>)}</div></div>)}</div>
      </div>
      <aside id="cycles"><h2>Upcoming milestones</h2><div className="milestones">{upcoming.length ? upcoming.map(e=><article key={e.id} className={`milestone ${e.status.toLowerCase()}`}><div className="dateBox"><b>{months[Number(e.date.slice(5,7))-1].slice(0,3)}</b><strong>{Number(e.date.slice(8))}</strong><span>{new Date(e.date+"T12:00:00").toLocaleDateString("en-US",{weekday:"short"})}</span></div><div className="eventText"><div className="meta">{e.org} · {e.level}</div><h3>{e.title}</h3><div><span className={`status ${e.status.toLowerCase()}`}>{e.status}</span><span className="type">{e.type}</span></div><p>{e.note}</p><a href={e.url} target="_blank" rel="noreferrer">Official source ↗</a></div></article>) : <div className="empty">No events match these filters.</div>}</div></aside>
    </section>
    <section className="midwest" aria-labelledby="midwest-title">
      <div className="sectionHead"><div><span className="kicker">Midwest chapters</span><h2 id="midwest-title">APA Illinois + APA Wisconsin</h2></div><p>Verified chapter events, workshops, and conferences.</p></div>
      <a className="localSource" href="https://www.ilapa.org/chicago-metro-section" target="_blank" rel="noreferrer"><span><b>Chicago Metro Section</b><small>Local programs and on-demand CM webinars</small></span><em>Monitoring for next dated event ↗</em></a>
      <div className="midwestGrid">{midwest.map(e=><article key={e.id} className="midwestEvent"><div className="midwestDate"><b>{months[Number(e.date.slice(5,7))-1].slice(0,3)}</b><strong>{Number(e.date.slice(8))}</strong></div><div><span className="chapterName">{e.org}</span><h3>{e.title}</h3><p>{e.note}</p><a href={e.url} target="_blank" rel="noreferrer">View official event ↗</a></div></article>)}</div>
    </section>
    <section className="chapterCoverage" aria-labelledby="chapter-title">
      <div className="sectionHead"><div><span className="kicker">National coverage</span><h2 id="chapter-title">All 48 APA chapters</h2></div><p>Every official chapter is tracked. “Monitoring” means no current event is published.</p></div>
      <label className="chapterSearch"><Icon name="search"/><input value={chapterQuery} onChange={e=>setChapterQuery(e.target.value)} placeholder="Find a chapter" aria-label="Find an APA chapter"/></label>
      <div className="chapterGrid">{visibleChapters.map(([name,url])=>{const count=chapterEventCount(name);return <a key={name} href={url} target="_blank" rel="noreferrer" className="chapterItem"><span>{name}</span><small className={count?"hasEvents":"monitoring"}>{count ? `${count} event${count===1?"":"s"}` : "Monitoring"}</small></a>})}</div>
    </section>
  </main>;
}
