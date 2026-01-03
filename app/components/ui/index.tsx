'use client'

import { ReactNode } from 'react'
import { Loader2 } from 'lucide-react'

export { ErrorBoundary } from './ErrorBoundary'

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
  loading?: boolean
  variant?: 'primary' | 'secondary' | 'outline'
  className?: string
  type?: 'button' | 'submit'
}

export function Button({
  children,
  onClick,
  disabled = false,
  loading = false,
  variant = 'primary',
  className = '',
  type = 'button'
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center px-6 py-3 font-semibold rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed'

  const variantStyles = {
    primary: 'bg-primary hover:bg-primary/90 text-white focus:ring-primary glow-primary',
    secondary: 'bg-surface hover:bg-surface/80 text-text-primary border border-surface-light focus:ring-surface',
    outline: 'bg-transparent border-2 border-primary text-primary hover:bg-primary/10 focus:ring-primary'
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {loading && <Loader2 className="w-5 h-5 mr-2 animate-spin" />}
      {children}
    </button>
  )
}

interface CardProps {
  children: ReactNode
  className?: string
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

export function Card({ children, className = '', padding = 'md' }: CardProps) {
  const paddingStyles = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  }

  return (
    <div className={`bg-surface rounded-xl border border-surface-light ${paddingStyles[padding]} ${className}`}>
      {children}
    </div>
  )
}

interface InputProps {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  type?: 'text' | 'email' | 'textarea' | 'select'
  options?: { value: string; label: string }[]
  disabled?: boolean
  error?: string
  helperText?: string
}

export function Input({
  label,
  value,
  onChange,
  placeholder = '',
  type = 'text',
  options = [],
  disabled = false,
  error,
  helperText
}: InputProps) {
  const inputId = label.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="space-y-2">
      <label htmlFor={inputId} className="block text-sm font-medium text-text-secondary">
        {label}
      </label>

      {type === 'textarea' ? (
        <textarea
          id={inputId}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full px-4 py-3 bg-background border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none ${
            error ? 'border-red-500' : 'border-surface-light hover:border-surface-light/80'
          }`}
          rows={5}
        />
      ) : type === 'select' ? (
        <select
          id={inputId}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={`w-full px-4 py-3 bg-background border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all appearance-none ${
            error ? 'border-red-500' : 'border-surface-light hover:border-surface-light/80'
          }`}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={inputId}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full px-4 py-3 bg-background border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
            error ? 'border-red-500' : 'border-surface-light hover:border-surface-light/80'
          }`}
        />
      )}

      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}

      {helperText && !error && (
        <p className="text-text-secondary text-sm">{helperText}</p>
      )}
    </div>
  )
}

interface SkeletonProps {
  className?: string
  lines?: number
}

export function Skeleton({ className = '', lines = 1 }: SkeletonProps) {
  return (
    <div className={`animate-shimmer rounded-lg ${className}`}>
      {lines === 1 ? (
        <div className="h-4 bg-surface-light rounded" />
      ) : (
        <div className="space-y-2">
          {Array.from({ length: lines }).map((_, i) => (
            <div key={i} className="h-4 bg-surface-light rounded" />
          ))}
        </div>
      )}
    </div>
  )
}

interface BadgeProps {
  children: ReactNode
  variant?: 'default' | 'success' | 'warning' | 'error'
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  const variantStyles = {
    default: 'bg-surface-light text-text-secondary',
    success: 'bg-accent/20 text-accent',
    warning: 'bg-yellow-500/20 text-yellow-500',
    error: 'bg-red-500/20 text-red-500'
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variantStyles[variant]}`}>
      {children}
    </span>
  )
}

interface SelectProps {
  label: string
  value: string
  onChange: (value: string) => void
  options: { value: string; label: string }[]
  disabled?: boolean
}

export function Select({ label, value, onChange, options, disabled = false }: SelectProps) {
  return (
    <Input
      label={label}
      value={value}
      onChange={onChange}
      type="select"
      options={options}
      disabled={disabled}
    />
  )
}
