import React from "react"

// helper className combiner
function cn(...classes) {
  return classes.filter(Boolean).join(" ")
}

// Headings
export function TypographyH1({ className, ...props }) {
  return (
    <h1
      className={cn("scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl", className)}
      {...props}
    />
  )
}

export function TypographyH2({ className, ...props }) {
  return (
    <h2
      className={cn("scroll-m-20 text-3xl font-semibold tracking-tight", className)}
      {...props}
    />
  )
}

export function TypographyH3({ className, ...props }) {
  return (
    <h3
      className={cn("scroll-m-20 text-2xl font-semibold tracking-tight", className)}
      {...props}
    />
  )
}

// Paragraphs
export function TypographyParagraph({ className, ...props }) {
  return (
    <p
      className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
      {...props}
    />
  )
}

export function TypographyMuted({ className, ...props }) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)} {...props} />
  )
}

export function TypographyLead({ className, ...props }) {
  return (
    <p className={cn("text-xl text-muted-foreground", className)} {...props} />
  )
}

export function TypographySmall({ className, ...props }) {
  return (
    <small className={cn("text-sm font-medium leading-none", className)} {...props} />
  )
}

// Blockquote
export function TypographyBlockquote({ className, ...props }) {
  return (
    <blockquote
      className={cn("mt-6 border-l-2 pl-6 italic text-muted-foreground", className)}
      {...props}
    />
  )
}

// Unordered List
export function TypographyList({ items = [], className }) {
  return (
    <ul className={cn("my-6 ml-6 list-disc [&>li]:mt-2", className)}>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  )
}

// Inline Code
export function TypographyInlineCode({ className, ...props }) {
  return (
    <code
      className={cn("relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm", className)}
      {...props}
    />
  )
}
