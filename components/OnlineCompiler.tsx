import React, { useEffect, useState } from 'react';

interface Language {
  id: string;
  name: string;
  extension: string;
  monacoLanguage: string;
  pistonLanguage: string;
  pistonVersion: string;
  defaultCode: string;
}

interface CodeFile {
  id: string;
  name: string;
  content: string;
  language: Language;
}

const LANGUAGES: Language[] = [
  {
    id: 'java',
    name: 'Java',
    extension: 'java',
    monacoLanguage: 'java',
    pistonLanguage: 'java',
    pistonVersion: '15.0.2',
    defaultCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`
  },
  {
    id: 'python',
    name: 'Python',
    extension: 'py',
    monacoLanguage: 'python',
    pistonLanguage: 'python',
    pistonVersion: '3.10.0',
    defaultCode: `# Python Code
print("Hello, World!")`
  },
  {
    id: 'c',
    name: 'C',
    extension: 'c',
    monacoLanguage: 'c',
    pistonLanguage: 'c',
    pistonVersion: '9.3.0',
    defaultCode: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`
  },
  {
    id: 'cpp',
    name: 'C++',
    extension: 'cpp',
    monacoLanguage: 'cpp',
    pistonLanguage: 'c++',
    pistonVersion: '9.3.0',
    defaultCode: `#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}`
  },
  {
    id: 'csharp',
    name: 'C#',
    extension: 'cs',
    monacoLanguage: 'csharp',
    pistonLanguage: 'csharp',
    pistonVersion: '6.12.0',
    defaultCode: `using System;

class Program {
    static void Main() {
        Console.WriteLine("Hello, World!");
    }
}`
  },
  {
    id: 'go',
    name: 'Go',
    extension: 'go',
    monacoLanguage: 'go',
    pistonLanguage: 'go',
    pistonVersion: '1.12.0',
    defaultCode: `package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}`
  },
  {
    id: 'rust',
    name: 'Rust',
    extension: 'rs',
    monacoLanguage: 'rust',
    pistonLanguage: 'rust',
    pistonVersion: '1.45.0',
    defaultCode: `fn main() {
    println!("Hello, World!");
}`
  },
  {
    id: 'kotlin',
    name: 'Kotlin',
    extension: 'kt',
    monacoLanguage: 'kotlin',
    pistonLanguage: 'kotlin',
    pistonVersion: '1.3.72',
    defaultCode: `fun main() {
    println("Hello, World!")
}`
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    extension: 'ts',
    monacoLanguage: 'typescript',
    pistonLanguage: 'typescript',
    pistonVersion: '4.0.0',
    defaultCode: `// TypeScript Code
const message: string = "Hello, World!";
console.log(message);`
  },
  {
    id: 'html',
    name: 'HTML',
    extension: 'html',
    monacoLanguage: 'html',
    pistonLanguage: 'javascript',
    pistonVersion: '18.12.1',
    defaultCode: `<!DOCTYPE html>
<html>
<head>
    <title>Hello</title>
</head>
<body>
    <h1>Hello, World!</h1>
</body>
</html>`
  },
  {
    id: 'css',
    name: 'CSS',
    extension: 'css',
    monacoLanguage: 'css',
    pistonLanguage: 'javascript',
    pistonVersion: '18.12.1',
    defaultCode: `/* CSS Code */
body {
    background-color: #f0f0f0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}`
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    extension: 'js',
    monacoLanguage: 'javascript',
    pistonLanguage: 'javascript',
    pistonVersion: '18.12.1',
    defaultCode: `// JavaScript Code
console.log("Hello, World!");`
  }
];

// Syntax highlighting patterns
const syntaxPatterns: Record<string, { keywords: string[]; strings: RegExp; comments: RegExp[]; numbers: RegExp }> = {
  java: {
    keywords: ['public', 'class', 'static', 'void', 'main', 'String', 'System', 'out', 'println', 'new', 'return', 'int', 'boolean'],
    strings: /"(?:[^"\\]|\\.)*"/g,
    comments: [/\/\/.*$/gm, /\/\*[\s\S]*?\*\//g],
    numbers: /\b\d+\b/g
  },
  python: {
    keywords: ['def', 'class', 'print', 'import', 'from', 'if', 'else', 'elif', 'for', 'while', 'return', 'True', 'False', 'None', 'and', 'or', 'not', 'in', 'is'],
    strings: /("""[\s\S]*?"""|'''[\s\S]*?'''|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g,
    comments: [/#.*$/gm],
    numbers: /\b\d+\b/g
  },
  c: {
    keywords: ['#include', 'stdio', 'stdlib', 'printf', 'scanf', 'int', 'float', 'double', 'char', 'void', 'main', 'return', 'if', 'else', 'for', 'while'],
    strings: /"(?:[^"\\]|\\.)*"/g,
    comments: [/\/\/.*$/gm, /\/\*[\s\S]*?\*\//g],
    numbers: /\b\d+\b/g
  },
  cpp: {
    keywords: ['#include', 'iostream', 'std', 'cout', 'cin', 'endl', 'using', 'namespace', 'int', 'float', 'double', 'char', 'void', 'main', 'return', 'class', 'public', 'private'],
    strings: /"(?:[^"\\]|\\.)*"/g,
    comments: [/\/\/.*$/gm, /\/\*[\s\S]*?\*\//g],
    numbers: /\b\d+\b/g
  },
  csharp: {
    keywords: ['using', 'System', 'namespace', 'class', 'static', 'void', 'Main', 'Console', 'WriteLine', 'public', 'private', 'int', 'string', 'return', 'new'],
    strings: /"(?:[^"\\]|\\.)*"/g,
    comments: [/\/\/.*$/gm, /\/\*[\s\S]*?\*\//g],
    numbers: /\b\d+\b/g
  },
  go: {
    keywords: ['package', 'main', 'import', 'fmt', 'func', 'var', 'const', 'if', 'else', 'for', 'return', 'go', 'chan', 'select'],
    strings: /"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*`/g,
    comments: [/\/\/.*$/gm],
    numbers: /\b\d+\b/g
  },
  rust: {
    keywords: ['fn', 'main', 'println', 'let', 'mut', 'const', 'if', 'else', 'for', 'while', 'return', 'use', 'mod', 'pub', 'struct', 'impl'],
    strings: /"(?:[^"\\]|\\.)*"/g,
    comments: [/\/\/.*$/gm, /\/\*[\s\S]*?\*\//g],
    numbers: /\b\d+\b/g
  },
  kotlin: {
    keywords: ['fun', 'main', 'println', 'val', 'var', 'if', 'else', 'for', 'while', 'return', 'class', 'import', 'package'],
    strings: /"(?:[^"\\]|\\.)*"|"""[\s\S]*?"""/g,
    comments: [/\/\/.*$/gm],
    numbers: /\b\d+\b/g
  },
  typescript: {
    keywords: ['const', 'let', 'var', 'function', 'interface', 'type', 'class', 'extends', 'implements', 'public', 'private', 'protected', 'return', 'if', 'else', 'for', 'while', 'async', 'await'],
    strings: /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`/g,
    comments: [/\/\/.*$/gm, /\/\*[\s\S]*?\*\//g],
    numbers: /\b\d+\b/g
  },
  html: {
    keywords: ['html', 'head', 'body', 'div', 'span', 'h1', 'h2', 'h3', 'p', 'a', 'img', 'script', 'style', 'link', 'meta', 'title'],
    strings: /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/g,
    comments: [/<!--[\s\S]*?-->/g],
    numbers: /\b\d+\b/g
  },
  css: {
    keywords: ['body', 'div', 'span', 'background-color', 'display', 'flex', 'justify-content', 'align-items', 'height', 'width', 'margin', 'padding', 'color', 'font-size'],
    strings: /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/g,
    comments: [/\/\*[\s\S]*?\*\//g],
    numbers: /\b\d+(?:px|em|rem|%|vh|vw)?\b/g
  },
  javascript: {
    keywords: ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'class', 'extends', 'new', 'this', 'async', 'await', 'console', 'log', 'document', 'window'],
    strings: /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`/g,
    comments: [/\/\/.*$/gm, /\/\*[\s\S]*?\*\//g],
    numbers: /\b\d+\b/g
  }
};

const highlightCode = (codeContent: string, languageId: string): string => {
  const patterns = syntaxPatterns[languageId];
  if (!patterns) return codeContent;

  let highlighted = codeContent;

  // Escape HTML
  highlighted = highlighted.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  // Highlight strings
  highlighted = highlighted.replace(patterns.strings, '<span class="syntax-string">$&</span>');

  // Highlight numbers
  highlighted = highlighted.replace(patterns.numbers, '<span class="syntax-number">$&</span>');

  // Highlight comments
  patterns.comments.forEach(regex => {
    highlighted = highlighted.replace(regex, '<span class="syntax-comment">$&</span>');
  });

  // Highlight keywords
  patterns.keywords.forEach(keyword => {
    const regex = new RegExp(`\\b${keyword}\\b`, 'g');
    highlighted = highlighted.replace(regex, '<span class="syntax-keyword">$&</span>');
  });

  return highlighted;
};

export const OnlineCompiler: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(LANGUAGES[0]);
  const [code, setCode] = useState<string>(LANGUAGES[0].defaultCode);
  const [output, setOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);
  const [fileName, setFileName] = useState<string>('main');
  const [files, setFiles] = useState<CodeFile[]>([]);
  const [activeFileId, setActiveFileId] = useState<string>('main');
  const [showPreview, setShowPreview] = useState(false);
  const [runtimeVersions, setRuntimeVersions] = useState<Record<string, string>>({});
  const [runtimeFetchError, setRuntimeFetchError] = useState<string | null>(null);
  const [isOutputFullScreen, setIsOutputFullScreen] = useState(false);

  // Check if current language is a web language
  const isWebLanguage = ['html', 'css', 'javascript'].includes(selectedLanguage.id);

  const handleCopyOutput = async () => {
    try {
      await navigator.clipboard.writeText(output || 'Output will appear here...');
    } catch (err) {
      console.error('Failed to copy output', err);
    }
  };

  // Lock body scroll when output fullscreen
  useEffect(() => {
    if (isOutputFullScreen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOutputFullScreen]);

  // Initialize with default file
  useEffect(() => {
    const initialFile: CodeFile = {
      id: 'main',
      name: 'main',
      content: LANGUAGES[0].defaultCode,
      language: LANGUAGES[0]
    };
    setFiles([initialFile]);
    setCode(LANGUAGES[0].defaultCode);
    setFileName('main');
  }, []);

  useEffect(() => {
    const fetchRuntimes = async () => {
      try {
        const response = await fetch('https://emkc.org/api/v2/piston/runtimes');
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        const data = await response.json();
        const map: Record<string, string> = {};
        data.forEach((runtime: { language?: string; version?: string }) => {
          if (runtime.language && runtime.version && !map[runtime.language]) {
            map[runtime.language] = runtime.version;
          }
        });
        setRuntimeVersions(map);
        setRuntimeFetchError(null);
      } catch (error) {
        setRuntimeFetchError(error instanceof Error ? error.message : 'Failed to fetch Piston runtimes');
      }
    };

    fetchRuntimes();
  }, []);

  // Update code when language changes
  const handleLanguageChange = (lang: Language) => {
    setSelectedLanguage(lang);
    setCode(lang.defaultCode);
    setFiles(prev =>
      prev.map(f =>
        f.id === activeFileId ? { ...f, content: lang.defaultCode, language: lang } : f
      )
    );
  };

  const getRuntimeVersion = (language: Language) => {
    const dynamicVersion = runtimeVersions[language.pistonLanguage];
    if (dynamicVersion) return dynamicVersion;
    return language.pistonVersion;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setOutput('Code copied to clipboard!');
      setTimeout(() => setOutput(''), 2000);
    } catch (err) {
      setOutput('Failed to copy code to clipboard');
    }
  };

  const handleShare = () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}?lang=${selectedLanguage.id}&code=${encodeURIComponent(code)}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setOutput('Share link copied to clipboard!');
      setTimeout(() => setOutput(''), 2000);
    }).catch(() => {
      setOutput('Failed to copy share link');
    });
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}.${selectedLanguage.extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setOutput(`Downloaded as ${fileName}.${selectedLanguage.extension}`);
    setTimeout(() => setOutput(''), 2000);
  };

  const handleAddFile = () => {
    const newId = `file_${Date.now()}`;
    setFiles((prev) => {
      const newFile: CodeFile = {
        id: newId,
        name: `file${prev.length + 1}`,
        content: `// ${selectedLanguage.name} file\n`,
        language: selectedLanguage
      };
      setActiveFileId(newId);
      setCode(newFile.content);
      setFileName(newFile.name);
      return [...prev, newFile];
    });
  };

  const handleRemoveFile = (fileId: string) => {
    setFiles((prev) => {
      if (prev.length === 1) {
        setOutput('Cannot remove the last file');
        setTimeout(() => setOutput(''), 2000);
        return prev;
      }
      const updatedFiles = prev.filter(f => f.id !== fileId);
      if (activeFileId === fileId && updatedFiles.length) {
        const next = updatedFiles[0];
        setActiveFileId(next.id);
        setCode(next.content);
        setFileName(next.name);
        setSelectedLanguage(next.language);
      }
      return updatedFiles;
    });
  };

  const handleSelectFile = (fileId: string) => {
    const file = files.find(f => f.id === fileId);
    if (file) {
      setActiveFileId(fileId);
      setCode(file.content);
      setFileName(file.name);
      setSelectedLanguage(file.language);
    }
  };

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    setFiles((prev) =>
      prev.map(f =>
        f.id === activeFileId ? { ...f, content: newCode } : f
      )
    );
  };

  const handleFileNameChange = (newName: string) => {
    setFileName(newName);
    setFiles((prev) =>
      prev.map(f =>
        f.id === activeFileId ? { ...f, name: newName } : f
      )
    );
  };

  const handleRun = async () => {
    setIsRunning(true);
    setOutput('Compiling and running...\n');

    try {
      const filesPayload = files.map(f => ({
        name: `${f.name}.${f.language.extension}`,
        content: f.content
      }));

      const pistonVersion = runtimeVersions[selectedLanguage.pistonLanguage];
      const runtimeInfoAvailable = Object.keys(runtimeVersions).length > 0;

      // Try Piston API first (only if runtime version known or runtime info unavailable)
      let success = false;
      let lastError = '';

      // Attempt 1: Piston API
      if (pistonVersion || !runtimeInfoAvailable) {
        try {
          const response = await fetch('https://emkc.org/api/v2/piston/execute', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              language: selectedLanguage.pistonLanguage,
              version: pistonVersion || selectedLanguage.pistonVersion,
              files: filesPayload,
            }),
          });

          if (response.ok) {
            const data = await response.json();
            if (data.compile && data.compile.code !== 0) {
              setOutput(`Compilation Error:\n${data.compile.stderr || data.compile.output || 'Unknown compilation error'}`);
            } else if (data.run && data.run.code !== 0) {
              setOutput(`Runtime Error:\n${data.run.stderr || data.run.output || 'Unknown runtime error'}`);
            } else {
              const compileOutput = data.compile?.output || '';
              const runOutput = data.run?.output || '';
              const combinedOutput = [compileOutput, runOutput].filter(Boolean).join('\n');
              setOutput(combinedOutput || 'Program executed successfully with no output.');
            }
            success = true;
          } else {
            lastError = `Piston API: HTTP ${response.status}`;
          }
        } catch (error) {
          lastError = `Piston API: ${error instanceof Error ? error.message : 'Unknown error'}`;
        }
      } else {
        lastError = 'Piston runtime for this language is unavailable. Trying Judge0...';
        setOutput('Piston runtime unavailable for this language. Trying Judge0 API...\n');
      }

      // Attempt 2: Judge0 API (if Piston failed)
      if (!success) {
        setOutput('Piston API failed, trying Judge0 API...\n');
        
        try {
          const judge0LanguageMap: Record<string, number> = {
            'java': 62,
            'python': 71,
            'c': 43,
            'cpp': 54,
            'csharp': 51,
            'go': 60,
            'r': 82,
            'rust': 73,
            'kotlin': 77,
            'javascript': 63,
            'typescript': 74,
          };

          const languageId = judge0LanguageMap[selectedLanguage.pistonLanguage] || 63;
          
          const judge0Response = await fetch('https://judge0-ce.pistonapi.xyz/submissions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              language_id: languageId,
              source_code: code,
            }),
          });

          if (judge0Response.ok) {
            const submissionData = await judge0Response.json();
            const token = submissionData.token;
            
            // Poll for result
            let result = null;
            let attempts = 0;
            while (attempts < 20 && !result) {
              await new Promise(resolve => setTimeout(resolve, 500));
              const statusResponse = await fetch(`https://judge0-ce.pistonapi.xyz/submissions/${token}`);
              const statusData = await statusResponse.json();
              
              if (statusData.status.id >= 3) {
                result = statusData;
              }
              attempts++;
            }

            if (result) {
              if (result.status.id === 6) {
                setOutput(`Compilation Error:\n${result.compile_output || 'Unknown compilation error'}`);
              } else if (result.status.id === 5) {
                setOutput(`Runtime Error:\n${result.stderr || result.stdout || 'Unknown runtime error'}`);
              } else {
                const output = [result.compile_output, result.stdout, result.stderr].filter(Boolean).join('\n');
                setOutput(output || 'Program executed successfully with no output.');
              }
              success = true;
            } else {
              lastError = 'Judge0 API: Timeout waiting for result';
            }
          } else {
            lastError = `Judge0 API: HTTP ${judge0Response.status}`;
          }
        } catch (error) {
          lastError = `Judge0 API: ${error instanceof Error ? error.message : 'Unknown error'}`;
        }
      }

      // Attempt 3: Emkc Judge0 (if both failed)
      if (!success) {
        setOutput('Trying alternative API endpoint...\n');
        
        try {
          const fallbackResponse = await fetch('https://judge0-ce.pistonapi.xyz/execute', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              language: selectedLanguage.pistonLanguage,
              version: selectedLanguage.pistonVersion,
              files: filesPayload,
            }),
          });
          
          if (fallbackResponse.ok) {
            const data = await fallbackResponse.json();
            if (data.compile && data.compile.code !== 0) {
              setOutput(`Compilation Error:\n${data.compile.stderr || data.compile.output || 'Unknown compilation error'}`);
            } else if (data.run && data.run.code !== 0) {
              setOutput(`Runtime Error:\n${data.run.stderr || data.run.output || 'Unknown runtime error'}`);
            } else {
              const compileOutput = data.compile?.output || '';
              const runOutput = data.run?.output || '';
              const combinedOutput = [compileOutput, runOutput].filter(Boolean).join('\n');
              setOutput(combinedOutput || 'Program executed successfully with no output.');
            }
            success = true;
          } else {
            const errorText = await fallbackResponse.text();
            lastError = `Fallback API: HTTP ${fallbackResponse.status} - ${errorText}`;
          }
        } catch (error) {
          lastError = `Fallback API: ${error instanceof Error ? error.message : 'Unknown error'}`;
        }
      }

      if (!success) {
        setOutput(`All execution attempts failed.\n\nErrors:\n${lastError}\n\nThis language may not be available on the current API servers. Try using JavaScript, Python, Java, or C# which are more widely supported.`);
      }
    } catch (error) {
      console.error('Execution error:', error);
      setOutput(`Error: ${error instanceof Error ? error.message : 'Failed to execute code. Please try again.'}\n\nMake sure you have a stable internet connection.\n\nIf the problem persists, the Piston API service might be temporarily unavailable.`);
    } finally {
      setIsRunning(false);
    }
  };

  const RunButton: React.FC<{ className?: string }> = ({ className = '' }) => (
    <div className={className}>
      <button
        onClick={handleRun}
        disabled={isRunning}
        className="px-12 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full text-[11px] font-black uppercase tracking-widest shadow-xl hover:shadow-2xl hover:scale-105 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-3"
      >
        <i className={`fa-solid ${isRunning ? 'fa-spinner fa-spin' : 'fa-play'}`}></i>
        {isRunning ? 'Running...' : 'Run Code'}
      </button>
    </div>
  );

  const handleClear = () => {
    setOutput('');
  };

  const handleReset = () => {
    setCode(selectedLanguage.defaultCode);
    setOutput('');
  };

  const handleClearCode = () => {
    setCode('');
    setFiles(prev =>
      prev.map(f =>
        f.id === activeFileId ? { ...f, content: '' } : f
      )
    );
  };

  const detectLanguageFromCode = (codeContent: string): Language | null => {
    const patterns: Record<string, RegExp> = {
      java: /\b(public|class|void|static|System\.out\.println|import java\.)/,
      python: /\b(print|def|import|from|class|if __name__|#!\/usr\/bin\/env python)/,
      c: /\b(#include <stdio\.h>|#include <stdlib\.h>|printf\(|scanf\(|int main\()/,
      cpp: /\b(#include <iostream>|std::cout|std::cin|using namespace std|std::vector)/,
      csharp: /\b(using System|namespace|Console\.WriteLine|public class)/,
      go: /\b(package main|import "fmt"|func main\(\))/,
      rust: /\b(fn main\(\)|println!|use std::|pub fn)/,
      kotlin: /\b(fun main\(\)|println\(|import|package)/,
      typescript: /\b(const \w+:\s*\w+|let \w+:\s*\w+|interface |type \w+ =)/,
      html: /<!DOCTYPE html>|<html|<head|<body|<div|<span/,
      css: /\.[a-z-]+\s*\{|@media|@keyframes|background-color|display:\s*flex/,
      javascript: /\b(const|let|var|function|=>|console\.log|document\.getElement)/,
    };

    for (const [langId, pattern] of Object.entries(patterns)) {
      if (pattern.test(codeContent)) {
        return LANGUAGES.find(l => l.id === langId) || null;
      }
    }

    return null;
  };

  const handleAutoDetectLanguage = () => {
    const detected = detectLanguageFromCode(code);
    if (detected && detected.id !== selectedLanguage.id) {
      setSelectedLanguage(detected);
      setFiles(prev =>
        prev.map(f =>
          f.id === activeFileId ? { ...f, language: detected } : f
        )
      );
      setOutput(`Auto-detected language: ${detected.name}`);
      setTimeout(() => setOutput(''), 2000);
    } else if (detected) {
      setOutput(`Language already set to: ${detected.name}`);
      setTimeout(() => setOutput(''), 2000);
    } else {
      setOutput('Could not auto-detect language from code');
      setTimeout(() => setOutput(''), 2000);
    }
  };

  const formatCode = (codeContent: string, language: Language): string => {
    // Basic formatting for common languages
    let formatted = codeContent;

    switch (language.id) {
      case 'javascript':
      case 'typescript':
        // Add semicolons after statements
        formatted = formatted.replace(/([a-zA-Z0-9])\s*\n/g, '$1;\n');
        // Fix spacing around operators
        formatted = formatted.replace(/([=+\-*/<>!&|])\s*/g, '$1 ');
        formatted = formatted.replace(/\s*([=+\-*/<>!&|])/g, ' $1');
        break;
      case 'python':
        // Ensure 4-space indentation
        formatted = formatted.replace(/\t/g, '    ');
        break;
      case 'java':
      case 'c':
      case 'cpp':
        // Fix braces spacing
        formatted = formatted.replace(/\{/g, ' {');
        formatted = formatted.replace(/\}/g, ' }');
        break;
      default:
        // Generic: remove extra blank lines
        formatted = formatted.replace(/\n{3,}/g, '\n\n');
    }

    return formatted.trim();
  };

  const handleFormatCode = () => {
    const formatted = formatCode(code, selectedLanguage);
    setCode(formatted);
    setFiles(prev =>
      prev.map(f =>
        f.id === activeFileId ? { ...f, content: formatted } : f
      )
    );
    setOutput('Code formatted');
    setTimeout(() => setOutput(''), 2000);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setCode(content);
        setFileName(file.name.split('.')[0]);
        setOutput(`Imported file: ${file.name}`);
        setTimeout(() => setOutput(''), 2000);
      }
    };
    reader.onerror = () => {
      setOutput('Failed to read file');
      setTimeout(() => setOutput(''), 2000);
    };
    reader.readAsText(file);
  };

  const handleExport = (format: 'pdf' | 'docx' | 'jpg') => {
    const contentToExport = `${selectedLanguage.name} Code - ${fileName}.${selectedLanguage.extension}\n\n${'='.repeat(50)}\n\n${code}\n\n${'='.repeat(50)}\n\nOutput:\n${output}`;

    switch (format) {
      case 'pdf':
        // Create a simple text-based PDF
        const pdfBlob = new Blob([contentToExport], { type: 'application/pdf' });
        downloadFile(pdfBlob, `${fileName}_output.pdf`);
        break;
      case 'docx':
        // Create a simple text-based DOCX (as plain text with .docx extension)
        const docxBlob = new Blob([contentToExport], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
        downloadFile(docxBlob, `${fileName}_output.docx`);
        break;
      case 'jpg':
        // Create a text-based image (render text to canvas and export as JPG)
        exportAsJPG(contentToExport);
        break;
    }
  };

  const downloadFile = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setOutput(`Exported as ${filename}`);
    setTimeout(() => setOutput(''), 2000);
  };

  const exportAsJPG = (content: string) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const padding = 40;
    const lineHeight = 20;
    const fontSize = 14;
    
    // Calculate canvas size
    const lines = content.split('\n');
    const maxWidth = Math.max(...lines.map(line => line.length * fontSize * 0.6));
    const height = lines.length * lineHeight + padding * 2;
    
    canvas.width = Math.max(maxWidth + padding * 2, 800);
    canvas.height = Math.max(height, 600);
    
    // Set white background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Set font
    ctx.font = `${fontSize}px monospace`;
    ctx.fillStyle = '#000000';
    
    // Draw content
    lines.forEach((line, index) => {
      ctx.fillText(line, padding, padding + (index + 1) * lineHeight);
    });
    
    // Export as JPG
    canvas.toBlob((blob) => {
      if (blob) {
        downloadFile(blob, `${fileName}_output.jpg`);
      } else {
        setOutput('Failed to export as JPG');
        setTimeout(() => setOutput(''), 2000);
      }
    }, 'image/jpeg');
  };

  return (
    <div className="animate-message h-screen flex flex-col overflow-hidden">
      <style>{`
        .syntax-keyword {
          color: #c678dd;
          font-weight: 600;
        }
        .syntax-string {
          color: #98c379;
        }
        .syntax-comment {
          color: #5c6370;
          font-style: italic;
        }
        .syntax-number {
          color: #d19a66;
        }
        .syntax-highlighted {
          outline: none;
          caret-color: #000;
        }
        .syntax-highlighted:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
        }
      `}</style>
      {/* Header */}
      <div className="bg-white rounded-[2rem] border border-slate-100 p-3 sm:p-4 shadow-sm flex-shrink-0">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4 mb-2 sm:mb-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
              <i className="fa-solid fa-code text-white text-xs sm:text-sm"></i>
            </div>
            <div>
              <h1 className="text-lg sm:text-xl lg:text-2xl font-black text-slate-900 tracking-tight">Online Compiler</h1>
              <p className="text-slate-500 text-[9px] sm:text-[10px] md:text-xs font-medium">Write, compile, and run code in multiple languages</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 sm:px-2 sm:py-1 bg-blue-50 text-blue-600 rounded-full text-[8px] sm:text-[9px] md:text-[10px] font-black uppercase tracking-wider border border-blue-100">
              {LANGUAGES.length} Languages
            </span>
          </div>
        </div>

        {/* Language Selector */}
        <div className="flex flex-wrap gap-1 sm:gap-2 p-1 bg-slate-50 rounded-xl border border-slate-100">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.id}
              onClick={() => setSelectedLanguage(lang)}
              className={`px-1.5 sm:px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[7px] sm:text-[9px] text-xs font-black uppercase tracking-wider transition-all ${
                selectedLanguage.id === lang.id
                  ? 'bg-white text-blue-600 shadow-sm border border-blue-200'
                  : 'text-slate-500 hover:text-slate-700 hover:bg-white/50'
              }`}
            >
              {lang.name}
            </button>
          ))}
        </div>
      </div>

      {/* File Tabs */}
      {files.length > 0 && (
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-100 p-1.5 sm:p-2 shadow-sm flex flex-wrap items-center gap-1.5 sm:gap-2 flex-shrink-0">
          <div className="flex flex-wrap items-center gap-1 sm:gap-2">
            {files.map((file) => (
              <div
                key={file.id}
                className={`flex items-center gap-1 sm:gap-2 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-xl text-[8px] sm:text-[10px] text-xs font-black uppercase tracking-wider border transition-all ${
                  activeFileId === file.id
                    ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200'
                    : 'bg-slate-50 text-slate-500 border-transparent hover:bg-white hover:border-slate-200'
                }`}
              >
                <button onClick={() => handleSelectFile(file.id)}>
                  {file.name}.{file.language.extension}
                </button>
                {files.length > 1 && (
                  <button
                    onClick={() => handleRemoveFile(file.id)}
                    className="text-[8px] sm:text-[9px] hover:text-red-500"
                    title="Remove file"
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            onClick={handleAddFile}
            className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-gradient-to-r from-emerald-500 to-lime-500 text-white rounded-xl text-[8px] sm:text-[10px] font-black uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center gap-1"
          >
            <i className="fa-solid fa-plus text-[8px] sm:text-[10px]"></i>
            <span className="hidden sm:inline text-[8px] sm:text-[10px]">Add File</span>
          </button>
        </div>
      )}

      {/* Run Button */}
      <RunButton className="flex justify-center flex-shrink-0 py-1 sm:py-2" />

      {/* Editor and Output */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 min-h-0 overflow-hidden">
        {/* Code Editor */}
        <div className="w-full bg-white rounded-xl sm:rounded-[1.5rem] border border-slate-100 overflow-hidden shadow-sm flex flex-col min-h-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5 sm:gap-2 px-1.5 sm:px-3 py-1.5 sm:py-2 bg-slate-50 border-b border-slate-100 flex-shrink-0">
            <div className="flex items-center gap-1 sm:gap-2">
              <i className="fa-solid fa-file-code text-slate-400 text-[9px] sm:text-[10px]"></i>
              <span className="text-[9px] sm:text-[10px] text-xs font-black text-slate-600 uppercase tracking-wider">
                {selectedLanguage.name}
              </span>
              <span className="px-1 sm:px-1.5 py-0.5 bg-slate-200 text-slate-600 rounded text-[7px] sm:text-[8px] font-bold">
                {selectedLanguage.extension}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-0.5 sm:gap-1">
              <input
                type="text"
                value={fileName}
                onChange={(e) => handleFileNameChange(e.target.value)}
                placeholder="filename"
                className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-white border border-slate-200 rounded-lg text-[8px] sm:text-[9px] font-bold text-slate-600 focus:outline-none focus:border-blue-500 w-12 sm:w-16 md:w-20"
              />
              <button
                onClick={handleAutoDetectLanguage}
                className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-white border border-slate-200 text-slate-600 rounded-lg text-[8px] sm:text-[9px] font-black uppercase tracking-wider hover:bg-slate-50 transition-all"
                title="Auto-detect language"
              >
                <i className="fa-solid fa-wand-magic-sparkles text-[9px] sm:text-[10px]"></i>
              </button>
              <button
                onClick={handleFormatCode}
                className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-white border border-slate-200 text-slate-600 rounded-lg text-[8px] sm:text-[9px] font-black uppercase tracking-wider hover:bg-slate-50 transition-all"
                title="Format code"
              >
                <i className="fa-solid fa-align-left text-[9px] sm:text-[10px]"></i>
              </button>
              <button
                onClick={handleClearCode}
                className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-white border border-slate-200 text-slate-600 rounded-lg text-[8px] sm:text-[9px] font-black uppercase tracking-wider hover:bg-slate-50 transition-all"
                title="Clear code"
              >
                <i className="fa-solid fa-trash text-[9px] sm:text-[10px]"></i>
              </button>
              <button
                onClick={handleCopy}
                className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-white border border-slate-200 text-slate-600 rounded-lg text-[8px] sm:text-[9px] font-black uppercase tracking-wider hover:bg-slate-50 transition-all"
                title="Copy to clipboard"
              >
                <i className="fa-solid fa-copy text-[9px] sm:text-[10px]"></i>
              </button>
              <button
                onClick={handleShare}
                className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-white border border-slate-200 text-slate-600 rounded-lg text-[8px] sm:text-[9px] font-black uppercase tracking-wider hover:bg-slate-50 transition-all"
                title="Share code"
              >
                <i className="fa-solid fa-share-nodes text-[9px] sm:text-[10px]"></i>
              </button>
              <button
                onClick={handleDownload}
                className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-white border border-slate-200 text-slate-600 rounded-lg text-[8px] sm:text-[9px] font-black uppercase tracking-wider hover:bg-slate-50 transition-all"
                title="Download code"
              >
                <i className="fa-solid fa-download text-[9px] sm:text-[10px]"></i>
              </button>
              <button
                onClick={handleReset}
                className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-white border border-slate-200 text-slate-600 rounded-lg text-[8px] sm:text-[9px] font-black uppercase tracking-wider hover:bg-slate-50 transition-all"
                title="Reset code"
              >
                <i className="fa-solid fa-rotate-right text-[9px] sm:text-[10px]"></i>
              </button>
            </div>
          </div>
          <div className="flex-1 min-h-0 relative">
            <textarea
              value={code}
              onChange={(e) => handleCodeChange(e.target.value)}
              className="w-full h-full p-2 sm:p-3 font-mono text-[11px] sm:text-xs md:text-sm lg:text-base resize-none focus:outline-none bg-transparent absolute top-0 left-0 z-10 text-transparent caret-black"
              style={{ 
                fontFamily: 'Fira Code, Consolas, Monaco, monospace',
                lineHeight: '1.6'
              }}
              spellCheck={false}
              placeholder="Write your code here..."
            />
            <div
              className="w-full h-full p-2 sm:p-3 font-mono text-[11px] sm:text-xs md:text-sm lg:text-base resize-none focus:outline-none bg-white overflow-auto whitespace-pre-wrap pointer-events-none"
              style={{ 
                fontFamily: 'Fira Code, Consolas, Monaco, monospace',
                lineHeight: '1.6'
              }}
            >
              <div
                dangerouslySetInnerHTML={{ __html: code ? highlightCode(code, selectedLanguage.id) : '<span class="text-slate-400">Write your code here...</span>' }}
                className="syntax-highlighted"
              />
            </div>
          </div>
        </div>

        {/* Output Panel */}
        <div className={`w-full bg-white rounded-xl sm:rounded-[1.5rem] border border-slate-100 overflow-hidden shadow-sm flex flex-col min-h-0 ${isOutputFullScreen ? 'fixed inset-0 z-50 m-0 rounded-none bg-white' : ''}`}>
          <div className="flex items-center justify-between px-1.5 sm:px-3 py-1.5 sm:py-2 bg-slate-50 border-b border-slate-100 flex-shrink-0">
            <div className="flex items-center gap-1 sm:gap-2">
              <i className={`fa-solid ${isWebLanguage && showPreview ? 'fa-globe' : 'fa-terminal'} text-slate-400 text-[9px] sm:text-[10px]`}></i>
              <span className="text-[9px] sm:text-[10px] text-xs font-black text-slate-600 uppercase tracking-wider">
                {isWebLanguage && showPreview ? 'Preview' : 'Output'}
              </span>
            </div>
            <div className="flex items-center gap-0.5 sm:gap-1">
              {isWebLanguage && (
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-white border border-slate-200 text-slate-600 rounded-lg text-[8px] sm:text-[9px] font-black uppercase tracking-wider hover:bg-slate-50 transition-all"
                  title={showPreview ? 'Show console output' : 'Show web preview'}
                >
                  <i className={`fa-solid ${showPreview ? 'fa-terminal' : 'fa-globe'} text-[9px] sm:text-[10px]`}></i>
                  <span className="hidden sm:inline ml-1 text-[8px] sm:text-[9px]">{showPreview ? 'Console' : 'Preview'}</span>
                </button>
              )}
              <button
                onClick={handleCopyOutput}
                className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-white border border-slate-200 text-slate-600 rounded-lg text-[8px] sm:text-[9px] font-black uppercase tracking-wider hover:bg-slate-50 transition-all"
                title="Copy output to clipboard"
              >
                <i className="fa-solid fa-copy text-[9px] sm:text-[10px]"></i>
              </button>
              <button
                onClick={() => setIsOutputFullScreen(!isOutputFullScreen)}
                className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-white border border-slate-200 text-slate-600 rounded-lg text-[8px] sm:text-[9px] font-black uppercase tracking-wider hover:bg-slate-50 transition-all"
                title={isOutputFullScreen ? 'Exit fullscreen' : 'Fullscreen'}
              >
                <i className={`fa-solid ${isOutputFullScreen ? 'fa-compress' : 'fa-expand'} text-[9px] sm:text-[10px]`}></i>
              </button>
              <button
                onClick={handleClear}
                className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-white border border-slate-200 text-slate-600 rounded-lg text-[8px] sm:text-[9px] font-black uppercase tracking-wider hover:bg-slate-50 transition-all"
                title="Clear output"
              >
                <i className="fa-solid fa-eraser text-[9px] sm:text-[10px]"></i>
              </button>
            </div>
          </div>
          <div className={`flex-1 min-h-0 ${isOutputFullScreen ? 'h-[calc(100vh-80px)]' : ''}`}>
            {isWebLanguage && showPreview ? (
              <iframe
                srcDoc={code}
                title="Preview"
                sandbox="allow-scripts"
                className="w-full h-full border-0 bg-white"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="h-full p-2 sm:p-3 bg-slate-950 overflow-auto">
                <pre className="font-mono text-[11px] sm:text-xs md:text-sm lg:text-base text-green-400 whitespace-pre-wrap">
                  {output || 'Output will appear here...'}
                </pre>
              </div>
            )}
          </div>
          {isOutputFullScreen && (
            <div className="absolute top-4 left-4 z-10">
              <button
                onClick={() => setIsOutputFullScreen(false)}
                className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white border border-slate-200 text-slate-600 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-wider hover:bg-slate-50 transition-all shadow-lg flex items-center gap-2"
              >
                <i className="fa-solid fa-arrow-left"></i>
                Back
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnlineCompiler;
