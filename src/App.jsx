import { useMemo, useState } from "react";
import {
  ArrowDown,
  BarChart3,
  Bot,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Headphones,
  LineChart,
  Megaphone,
  Mic2,
  PenLine,
  Play,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  UsersRound
} from "lucide-react";
import student from "./data/student.json";
import words from "./data/words.json";
import report from "./data/report.json";

const navItems = [
  { label: "首页", href: "#home" },
  { label: "训练体验", href: "#assessment" },
  { label: "成长报告", href: "#report" },
  { label: "机构合作", href: "#partner" }
];

const loopSteps = [
  { label: "AI测评", icon: ClipboardCheck },
  { label: "智能计划", icon: Bot },
  { label: "每日训练", icon: PenLine },
  { label: "能力检测", icon: Target },
  { label: "成长报告", icon: LineChart }
];

const partnerValues = [
  "增加招生体验产品",
  "提高家长信任",
  "减少老师重复监督工作",
  "提升续费率"
];

function App() {
  const [score, setScore] = useState(student.currentScore);
  const [analysisStarted, setAnalysisStarted] = useState(false);
  const [dictation, setDictation] = useState("");
  const word = words[0];

  const gap = student.targetVocabulary - student.currentVocabulary;
  const dictationStatus = useMemo(() => {
    if (!dictation.trim()) return "waiting";
    return dictation.trim().toLowerCase() === word.word ? "correct" : "wrong";
  }, [dictation, word.word]);

  const playPronunciation = () => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(word.word);
      utterance.lang = "en-US";
      utterance.rate = 0.85;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7fafc] text-ink">
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/92 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <a href="#home" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-ink text-white">
              <Sparkles size={20} />
            </span>
            <span className="text-base font-semibold tracking-normal">AI英语提分训练系统</span>
          </a>
          <div className="hidden items-center gap-2 md:flex">
            {navItems.map((item) => (
              <a key={item.href} className="nav-link" href={item.href}>
                {item.label}
              </a>
            ))}
          </div>
          <a className="primary-button hidden md:inline-flex" href="#partner">
            申请测试合作
            <ChevronRight size={17} />
          </a>
        </nav>
      </header>

      <main>
        <section id="home" className="hero-section">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-20">
            <div>
              <div className="eyebrow">
                <ShieldCheck size={16} />
                AI + 老师协同的英语提分服务 Demo
              </div>
              <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-tight tracking-normal text-ink lg:text-6xl">
                AI英语提分训练系统
              </h1>
              <p className="mt-6 max-w-2xl text-xl leading-8 text-slate-600">
                帮助英语培训机构打造AI+老师的英语提分服务。
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a className="primary-button h-12 px-5" href="#assessment">
                  <Play size={18} />
                  体验学生训练流程
                </a>
                <a className="secondary-button h-12 px-5" href="#partner">
                  <BriefcaseBusiness size={18} />
                  机构合作咨询
                </a>
              </div>
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                <MetricCard value="7天" label="词汇突破训练" />
                <MetricCard value="4小时" label="每天科学训练" />
                <MetricCard value="90%" label="阶段检测目标" />
              </div>
            </div>

            <div className="dashboard-frame">
              <div className="flex items-start justify-between border-b border-slate-200 pb-5">
                <div>
                  <p className="text-sm text-slate-500">招生体验 Demo</p>
                  <h2 className="mt-2 text-2xl font-semibold">7天英语词汇突破训练</h2>
                </div>
                <span className="status-pill">AI计划已生成</span>
              </div>
              <div className="mt-6 grid gap-4">
                {loopSteps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div className="loop-row" key={step.label}>
                      <span className="loop-index">{index + 1}</span>
                      <Icon className="text-cobalt" size={20} />
                      <span className="font-medium">{step.label}</span>
                      {index < loopSteps.length - 1 && <ArrowDown className="ml-auto text-slate-300" size={18} />}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <Section id="assessment" label="学生测评" title="从一次入学测评，生成可销售的提分路径">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <Panel>
              <div className="flex items-center gap-3">
                <div className="icon-box bg-cobalt text-white">
                  <UsersRound size={20} />
                </div>
                <div>
                  <h3 className="panel-title">{student.name}</h3>
                  <p className="text-sm text-slate-500">{student.grade} · 目标：{student.goal}</p>
                </div>
              </div>
              <label className="mt-8 block text-sm font-medium text-slate-600" htmlFor="score">
                当前英语成绩
              </label>
              <div className="mt-3 flex items-center gap-3">
                <input
                  id="score"
                  className="score-input"
                  min="0"
                  max="150"
                  type="number"
                  value={score}
                  onChange={(event) => setScore(event.target.value)}
                />
                <span className="text-slate-500">分</span>
              </div>
              <button className="primary-button mt-6 w-full justify-center" onClick={() => setAnalysisStarted(true)}>
                <Bot size={18} />
                开始AI分析
              </button>
            </Panel>

            <Panel className={analysisStarted ? "ring-2 ring-teal/20" : ""}>
              <div className="flex items-center justify-between">
                <h3 className="panel-title">AI测评报告</h3>
                <span className="status-pill">{analysisStarted ? "已完成" : "待分析"}</span>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <DataTile label="当前词汇量" value={student.currentVocabulary} />
                <DataTile label="目标词汇" value={student.targetVocabulary} />
                <DataTile label="词汇缺口" value={gap} accent />
              </div>
              <div className="mt-6 rounded-lg border border-teal/20 bg-teal/5 p-5">
                <p className="text-sm font-medium text-teal">AI建议</p>
                <p className="mt-2 text-lg font-semibold">7天词汇突破计划</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  基于当前成绩 {score || 0} 分和词汇缺口，优先训练高频中考词、长单词拼写与语境应用。
                </p>
              </div>
            </Panel>
          </div>
        </Section>

        <Section id="training" label="AI训练" title="完整单词学习流程：理解、记忆、例句、检测">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <Panel>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-500">今日核心词</p>
                  <h3 className="mt-2 text-4xl font-semibold tracking-normal">{word.word}</h3>
                  <p className="mt-2 text-lg text-cobalt">{word.phonetic}</p>
                </div>
                <div className="rounded-lg border border-slate-200 bg-slate-50 px-5 py-4 text-center">
                  <p className="text-sm text-slate-500">中文释义</p>
                  <p className="mt-1 text-2xl font-semibold">{word.meaning}</p>
                </div>
              </div>
              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                {word.roots.map((root) => (
                  <div className="root-card" key={root.part}>
                    <span className="font-semibold text-ink">{root.part}</span>
                    <span className="text-slate-500">= {root.meaning}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-lg bg-mist p-5">
                <p className="text-sm font-medium text-slate-500">AI记忆方法</p>
                <p className="mt-2 leading-7">{word.memory}</p>
              </div>
              <div className="mt-5 border-l-4 border-cobalt bg-white px-5 py-4 shadow-sm">
                <p className="text-sm text-slate-500">例句</p>
                <p className="mt-1 text-lg">{word.example}</p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <button className="secondary-button" onClick={playPronunciation}>
                  <Headphones size={18} />
                  播放发音
                </button>
                <a className="secondary-button" href="#test">
                  <PenLine size={18} />
                  开始默写
                </a>
                <a className="primary-button" href="#test">
                  <CheckCircle2 size={18} />
                  完成学习
                </a>
              </div>
            </Panel>

            <Panel>
              <h3 className="panel-title">AI训练节奏</h3>
              <div className="mt-6 space-y-4">
                <ProgressLine label="词义识别" value={96} />
                <ProgressLine label="词根拆解" value={90} />
                <ProgressLine label="语境应用" value={88} />
                <ProgressLine label="默写准备" value={92} />
              </div>
              <div className="mt-7 rounded-lg border border-amber/20 bg-amber/10 p-5">
                <p className="text-sm font-medium text-amber">老师可见提醒</p>
                <p className="mt-2 text-sm leading-6 text-slate-700">
                  学生对词根记忆接受度较高，可在课后跟进长单词拼写稳定性。
                </p>
              </div>
            </Panel>
          </div>
        </Section>

        <Section id="test" label="能力检测" title="听音默写与多维掌握度评分">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <Panel>
              <div className="flex items-center gap-3">
                <div className="icon-box bg-teal text-white">
                  <Mic2 size={20} />
                </div>
                <div>
                  <h3 className="panel-title">听音默写</h3>
                  <p className="text-sm text-slate-500">目标单词：{word.word}</p>
                </div>
              </div>
              <button className="secondary-button mt-6 w-full justify-center" onClick={playPronunciation}>
                <Headphones size={18} />
                播放听写音频
              </button>
              <input
                className="dictation-input"
                placeholder="请输入听到的英文单词"
                value={dictation}
                onChange={(event) => setDictation(event.target.value)}
              />
              <div className={`answer-state ${dictationStatus}`}>
                {dictationStatus === "waiting" && "等待输入"}
                {dictationStatus === "correct" && "AI判断：正确"}
                {dictationStatus === "wrong" && "AI判断：错误，请检查拼写"}
              </div>
            </Panel>

            <Panel>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-500">单词掌握度</p>
                  <p className="mt-1 text-5xl font-semibold text-cobalt">{word.mastery}%</p>
                </div>
                <BarChart3 className="text-slate-300" size={52} />
              </div>
              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                <ScoreDimension label="识别能力" value={word.scores.recognition} />
                <ScoreDimension label="发音能力" value={word.scores.pronunciation} />
                <ScoreDimension label="拼写能力" value={word.scores.spelling} />
                <ScoreDimension label="应用能力" value={word.scores.application} />
              </div>
            </Panel>
          </div>
        </Section>

        <Section id="report" label="成长报告" title={`${report.studentName}英语成长报告`}>
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <Panel>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-500">7天训练效果</p>
                  <h3 className="panel-title mt-1">训练时间：{report.trainingHours}小时</h3>
                </div>
                <span className="status-pill">阶段目标接近达成</span>
              </div>
              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                <BeforeAfter title="词汇量" before={report.vocabulary.before} after={report.vocabulary.after} suffix="" />
                <BeforeAfter title="拼写正确率" before={report.accuracy.before} after={report.accuracy.after} suffix="%" />
              </div>
            </Panel>
            <Panel>
              <div className="grid gap-4">
                <InsightRow label="薄弱" value={report.weakness} icon={Target} />
                <InsightRow label="下一阶段" value={report.nextStage} icon={TrendingUp} />
                <InsightRow label="续费沟通点" value="词汇突破后进入阅读能力提升" icon={Megaphone} />
              </div>
            </Panel>
          </div>
        </Section>

        <Section id="parent-report" label="家长报告" title="微信报告风格：让家长看得懂、愿意续">
          <div className="wechat-report">
            <div className="flex items-center justify-between border-b border-emerald-100 pb-4">
              <div>
                <p className="text-sm text-emerald-700">孩子本周英语学习报告</p>
                <h3 className="mt-1 text-2xl font-semibold">{report.studentName}</h3>
              </div>
              <span className="rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium text-white">本周</span>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <DataTile label="学习时间" value={`${report.weeklyHours}小时`} />
              <DataTile label="新增词汇" value={report.newWords} />
              <DataTile label="完成率" value={`${report.completionRate}%`} accent />
            </div>
            <div className="mt-6 rounded-lg bg-emerald-50 p-5">
              <p className="text-sm font-medium text-emerald-700">AI建议</p>
              <p className="mt-2 text-slate-700">{report.aiAdvice}</p>
            </div>
          </div>
        </Section>

        <Section id="partner" label="机构合作" title="让您的英语机构拥有AI提分服务。">
          <div className="partner-band">
            <div>
              <p className="eyebrow w-fit bg-white/12 text-white">
                <BriefcaseBusiness size={16} />
                面向英语辅导机构
              </p>
              <h2 className="mt-5 max-w-2xl text-4xl font-semibold leading-tight tracking-normal text-white">
                把AI训练变成招生体验产品、续费沟通材料和老师提效工具。
              </h2>
              <a className="mt-7 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 font-semibold text-ink transition hover:bg-mist" href="mailto:partner@example.com">
                申请30天测试合作
                <ChevronRight size={18} />
              </a>
            </div>
            <div className="grid gap-3">
              {partnerValues.map((value, index) => (
                <div className="partner-value" key={value}>
                  <span>{index + 1}</span>
                  <p>{value}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>
      </main>
    </div>
  );
}

function Section({ id, label, title, children }) {
  return (
    <section id={id} className="scroll-mt-24 px-5 py-12 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="section-label">{label}</p>
        <h2 className="section-title">{title}</h2>
        <div className="mt-7">{children}</div>
      </div>
    </section>
  );
}

function Panel({ children, className = "" }) {
  return <div className={`panel ${className}`}>{children}</div>;
}

function MetricCard({ value, label }) {
  return (
    <div className="metric-card">
      <p className="text-3xl font-semibold">{value}</p>
      <p className="mt-2 text-sm text-slate-500">{label}</p>
    </div>
  );
}

function DataTile({ label, value, accent = false }) {
  return (
    <div className={`data-tile ${accent ? "accent" : ""}`}>
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
    </div>
  );
}

function ProgressLine({ label, value }) {
  return (
    <div>
      <div className="mb-2 flex justify-between text-sm">
        <span className="font-medium">{label}</span>
        <span className="text-slate-500">{value}%</span>
      </div>
      <div className="h-2 rounded-full bg-slate-100">
        <div className="h-2 rounded-full bg-cobalt" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function ScoreDimension({ label, value }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
      <p className="text-sm text-slate-500">{label}</p>
      <div className="mt-3 flex items-center gap-3">
        <div className="h-2 flex-1 rounded-full bg-white">
          <div className="h-2 rounded-full bg-teal" style={{ width: `${value}%` }} />
        </div>
        <span className="w-10 text-right font-semibold">{value}</span>
      </div>
    </div>
  );
}

function BeforeAfter({ title, before, after, suffix }) {
  return (
    <div className="rounded-lg border border-slate-200 p-5">
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <div className="mt-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs text-slate-400">训练前</p>
          <p className="mt-1 text-2xl font-semibold">{before}{suffix}</p>
        </div>
        <ChevronRight className="text-slate-300" />
        <div className="text-right">
          <p className="text-xs text-slate-400">训练后</p>
          <p className="mt-1 text-2xl font-semibold text-teal">{after}{suffix}</p>
        </div>
      </div>
    </div>
  );
}

function InsightRow({ label, value, icon: Icon }) {
  return (
    <div className="flex items-center gap-4 rounded-lg border border-slate-200 p-4">
      <div className="icon-box bg-mist text-cobalt">
        <Icon size={19} />
      </div>
      <div>
        <p className="text-sm text-slate-500">{label}</p>
        <p className="mt-1 font-semibold">{value}</p>
      </div>
    </div>
  );
}

export default App;
