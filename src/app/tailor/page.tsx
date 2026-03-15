"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Wand2,
  FileText,
  HelpCircle,
  Loader2,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  Target,
  Shield,
  Code2,
  Download,
  Copy,
  Check,
} from "lucide-react";
import type { TailorResult } from "@/lib/schemas/tailor";
import { generateTailoredResumeLatex } from "@/lib/latex";

export default function TailorPage() {
  const [jdText, setJdText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<TailorResult | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const latexCode = result ? generateTailoredResumeLatex(result, jdText) : "";

  const handleGenerate = async () => {
    if (!jdText.trim()) return;
    setIsGenerating(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/ai/tailor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetJd: jdText,
          masterProfile: "（暂未接入 Profile 数据，此处为占位）",
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "生成失败");
      }

      const data: TailorResult = await res.json();
      setResult(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "请求失败，请重试");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadLatex = () => {
    if (!latexCode) return;

    const blob = new Blob([latexCode], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "resume-copilot-tailored-resume.tex";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const handleCopyLatex = async () => {
    if (!latexCode) return;

    await navigator.clipboard.writeText(latexCode);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">AI 定制工作台</h1>
        <p className="text-sm text-muted-foreground">
          粘贴目标岗位 JD，AI 从你的素材库中精准匹配、定制简历并预测面试题
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* 左栏：JD 输入（占 2 列） */}
        <div className="space-y-4 lg:col-span-2">
          <Card className="shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                  <Target className="h-4.5 w-4.5" />
                </div>
                <div>
                  <CardTitle className="text-base">目标职位 JD</CardTitle>
                  <CardDescription>
                    粘贴完整的职位描述
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder={"粘贴 JD 内容...\n\n例如：\n我们正在寻找一位高级前端工程师，负责...\n\n职责：\n• ...\n\n要求：\n• ..."}
                rows={18}
                className="resize-none text-[13px]"
                value={jdText}
                onChange={(e) => setJdText(e.target.value)}
              />
              {error && (
                <div className="flex items-center gap-2 rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  <AlertTriangle className="h-4 w-4 shrink-0" />
                  {error}
                </div>
              )}
              <Button
                className="w-full shadow-sm shadow-indigo-500/20"
                size="lg"
                onClick={handleGenerate}
                disabled={!jdText.trim() || isGenerating}
              >
                {isGenerating ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                {isGenerating ? "AI 正在分析匹配中..." : "生成定制简历"}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* 右栏：结果预览（占 3 列） */}
        <div className="space-y-4 lg:col-span-3">
          {/* 定制简历预览 */}
          <Card className="shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                  <FileText className="h-4.5 w-4.5" />
                </div>
                <div>
                  <CardTitle className="text-base">定制简历预览</CardTitle>
                  <CardDescription>
                    AI 为你量身裁剪的简历结构
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {!result ? (
                <div className="flex h-52 flex-col items-center justify-center gap-3 rounded-xl border border-dashed bg-muted/20">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                    <Wand2 className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-muted-foreground">
                      等待生成
                    </p>
                    <p className="text-xs text-muted-foreground/70">
                      在左侧输入 JD 后点击生成按钮
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* 定制摘要 */}
                  <div className="space-y-2">
                    <h3 className="flex items-center gap-2 text-sm font-semibold">
                      <span className="h-1 w-1 rounded-full bg-indigo-500" />
                      定制自我介绍
                    </h3>
                    <div className="rounded-lg bg-indigo-50/50 p-4">
                      <p className="text-sm leading-relaxed text-foreground/80">
                        {result.tailoredSummary}
                      </p>
                    </div>
                  </div>

                  {/* 匹配技能 */}
                  <div className="space-y-2.5">
                    <h3 className="flex items-center gap-2 text-sm font-semibold">
                      <Code2 className="h-3.5 w-3.5 text-emerald-600" />
                      匹配技能
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {result.matchedSkills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* 精选项目 */}
                  <div className="space-y-3">
                    <h3 className="flex items-center gap-2 text-sm font-semibold">
                      <span className="h-1 w-1 rounded-full bg-amber-500" />
                      精选项目经历
                    </h3>
                    {result.selectedProjects.map((proj, pi) => (
                      <div
                        key={proj.projectName}
                        className="rounded-xl border bg-card p-4 shadow-sm"
                      >
                        <div className="mb-3 flex items-center gap-2.5">
                          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-indigo-100 text-xs font-bold text-indigo-600">
                            {pi + 1}
                          </div>
                          <span className="text-sm font-semibold">
                            {proj.projectName}
                          </span>
                          <Badge
                            variant="outline"
                            className="ml-auto text-[10px]"
                          >
                            {proj.role}
                          </Badge>
                        </div>
                        <ul className="space-y-1.5 pl-1">
                          {proj.tailoredBullets.map((bullet, bi) => (
                            <li
                              key={bi}
                              className="flex gap-2 text-[13px] leading-relaxed text-muted-foreground"
                            >
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-300" />
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-xl border bg-muted/30 p-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm font-semibold">导出 LaTeX 简历代码</p>
                        <p className="text-xs text-muted-foreground">
                          可直接下载 `.tex` 文件，或复制到 Overleaf / XeLaTeX 继续排版。
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleCopyLatex}
                        >
                          {copied ? (
                            <Check className="mr-1.5 h-4 w-4" />
                          ) : (
                            <Copy className="mr-1.5 h-4 w-4" />
                          )}
                          {copied ? "已复制" : "复制代码"}
                        </Button>
                        <Button size="sm" onClick={handleDownloadLatex}>
                          <Download className="mr-1.5 h-4 w-4" />
                          下载 .tex
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* 面试预测 */}
          <Card className="shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                  <Shield className="h-4.5 w-4.5" />
                </div>
                <div>
                  <CardTitle className="text-base">面试预测</CardTitle>
                  <CardDescription>
                    基于简历与 JD 的匹配分析
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {!result?.interviewPreparation ? (
                <div className="flex h-24 flex-col items-center justify-center gap-1 rounded-xl border border-dashed bg-muted/20">
                  <p className="text-xs text-muted-foreground">
                    生成简历后自动预测面试问题
                  </p>
                </div>
              ) : (
                <div className="space-y-5">
                  {/* 高频题 */}
                  <div className="space-y-2.5">
                    <h4 className="flex items-center gap-2 text-xs font-semibold">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      <span className="text-emerald-700">
                        高频面试题 — 你的强项
                      </span>
                    </h4>
                    <div className="space-y-2">
                      {result.interviewPreparation.highFrequencyQuestions.map(
                        (q, i) => (
                          <div
                            key={i}
                            className="flex gap-3 rounded-lg border border-emerald-100 bg-emerald-50/50 p-3"
                          >
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-bold text-white">
                              {i + 1}
                            </span>
                            <span className="text-sm text-emerald-900">
                              {q}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* 压力测试题 */}
                  <div className="space-y-2.5">
                    <h4 className="flex items-center gap-2 text-xs font-semibold">
                      <div className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                      <span className="text-amber-700">
                        压力测试题 — 需要准备
                      </span>
                    </h4>
                    <div className="space-y-2">
                      {result.interviewPreparation.weaknessQuestions.map(
                        (q, i) => (
                          <div
                            key={i}
                            className="flex gap-3 rounded-lg border border-amber-100 bg-amber-50/50 p-3"
                          >
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-white">
                              {i + 1}
                            </span>
                            <span className="text-sm text-amber-900">{q}</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* 面试策略 */}
                  <div className="flex items-start gap-3 rounded-xl bg-gradient-to-r from-indigo-50 to-violet-50 p-4">
                    <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-indigo-500" />
                    <div>
                      <p className="text-xs font-semibold text-indigo-700">
                        面试策略建议
                      </p>
                      <p className="mt-1 text-sm text-indigo-900/70">
                        {result.interviewPreparation.tips}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
