import {AvatarProps, Skeleton as SkeletonA, SkeletonProps as SkeletonPropsA} from "antd"
import { SkeletonButtonProps } from "antd/es/skeleton/Button"
import { SkeletonImageProps } from "antd/es/skeleton/Image"
import { SkeletonInputProps } from "antd/es/skeleton/Input"
import React from "react"

type SkeletonObject = {
    (props : SkeletonPropsA) : JSX.Element
    Avatar : React.FC<AvatarProps>
    Input : React.FC<SkeletonInputProps>
    Button : React.FC<SkeletonButtonProps>
    Image : React.FC<SkeletonImageProps>
}

export const Skeleton : SkeletonObject = (props) => {
  return (
    <div>
        <SkeletonA {...props}/>
    </div>
  )
}

Skeleton.Avatar = SkeletonA.Avatar
Skeleton.Input = SkeletonA.Input
Skeleton.Button = SkeletonA.Button
Skeleton.Image = SkeletonA.Image