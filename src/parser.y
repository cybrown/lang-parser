%lex
%%

\s+                   /* skip whitespace */
"class"               return 'CLASS'
[0-9]+("."[0-9]+)?\b  return 'LITERAL_NUMBER'
[a-zA-Z_]+[0-9a-zA-Z_]* return 'IDENTIFIER'
"=>"                  return 'ARROW'
"*"                   return '*'
"%"                   return '%'
"/"                   return '/'
"-"                   return '-'
"+"                   return '+'
"("                   return '('
")"                   return ')'
"{"                   return '{'
"}"                   return '}'
"["                   return '['
"]"                   return ']'
"<"                   return '<'
">"                   return '>'
","                   return ','
"="                   return '='
";"                   return ';'
"?"                   return '?'
":"                   return ':'
<<EOF>>               return 'EOF'
.                     return 'INVALID'

/lex

%start Program

%%

Program
    : Statement EOF
        {return yy.node.Program([$1]);}
    | StatementList EOF
        {return yy.node.Program($1);}
    ;

/* Statements */

Statement
    : ExpressionStatement
        {$$ = $1;}
    | BlockStatement
        {$$ = $1;}
    | DeclarationStatement
        {$$ = $1;}
    ;

DeclarationStatement
    : ClassDeclaration
        {$$ = $1;}
    ;

ExpressionStatement
    : Expression ';'
        {$$ = yy.node.ExpressionStatement($1);}
    ;

BlockStatement
    : '{' Statement '}'
        {$$ = yy.node.BlockStatement([$2]);}
    | '{' StatementList '}'
        {$$ = yy.node.BlockStatement($2);}
    | '{' '}'
        {$$ = yy.node.BlockStatement();}
    ;

StatementList
    : Statement Statement
        {$$ = [$1, $2];}
    | StatementList Statement
        {
            $1.push($2);
            $$ = $1;
        }
    ;

/* END Statements */

/* Declarations */

ClassDeclaration
    : CLASS IDENTIFIER '{' '}'
        {$$ = yy.node.ClassDeclaration($2, []);}
    | CLASS IDENTIFIER '{' ClassMemberList '}'
        {$$ = yy.node.ClassDeclaration($2, $4);}
    ;

/* END Declarations */

/* Subdeclarations */

ClassMemberList
    : ClassMember
        {$$ = [$1];}
    | ClassMemberList ClassMember
        {
            $1.push($2);
            $$ = $1;
        }
    ;

ClassMember
    : ClassAttribute
        {$$ = $1;}
    | ClassMethod
        {$$ = $1;}
    ;

ClassAttribute
    : Type IDENTIFIER ';'
        {$$ = yy.node.ClassAttribute($2, $1);}
    ;

ClassMethod
    : Type IDENTIFIER '(' ')' BlockStatement
        {$$ = yy.node.ClassMethod($2, $1, [], $5);}
    ;

Type
    : IDENTIFIER
        {$$ = yy.node.Identifier($1);}
    ;

/* END Subdeclarations */

/* Expressions */

Expression
    : AssignmentExpression
        {$$ = $1;}
    ;

AssignmentExpression
    : LambdaExpression
        {$$ = $1;}
    | AssignmentExpression '=' LambdaExpression
        {$$ = yy.node.AssignmentExpression($2, $1, $3);}
    ;

LambdaExpression
    : ConditionalExpression
        {$$ = $1;}
    | '(' ')' ARROW ConditionalExpression
        {$$ = yy.node.LambdaExpression([], $4);}
    | ParanthesisExpression ARROW ConditionalExpression
        {
            if (!$1.type || $1.type !== 'Identifier') {
                throw new Error('Lambda arguments can only be identifiers');
            }
            $$ = yy.node.LambdaExpression([$1], $3);
        }
    | IDENTIFIER ARROW ConditionalExpression
        {$$ = yy.node.LambdaExpression([yy.node.Identifier($1)], $3);}
    | '(' LambdaParameterList ')' ARROW ConditionalExpression
        {$$ = yy.node.LambdaExpression($2, $5);}
    | '(' LambdaParameterList ')' ARROW BlockStatement
        {$$ = yy.node.LambdaExpression($2, $5);}
    ;

ConditionalExpression
    : ComparisonExpression
        {$$ = $1;}
    | ComparisonExpression '?' Expression ':' ConditionalExpression
        {$$ = yy.node.ConditionalExpression($1, $3, $5);}
    ;

ComparisonExpression
    : AdditiveExpression
        {$$ = $1;}
    | ComparisonExpression '<' AdditiveExpression
        {$$ = yy.node.BinaryExpression($2, $1, $3);}
    | ComparisonExpression '>' AdditiveExpression
        {$$ = yy.node.BinaryExpression($2, $1, $3);}
    ;

AdditiveExpression
    : MultiplicativeExpression
        {$$ = $1;}
    | AdditiveExpression '+' MultiplicativeExpression
        {$$ = yy.node.BinaryExpression($2, $1, $3);}
    | AdditiveExpression '-' MultiplicativeExpression
        {$$ = yy.node.BinaryExpression($2, $1, $3);}
    ;

MultiplicativeExpression
    : PrefixExpression
        {$$ = $1;}
    | MultiplicativeExpression '*' PrefixExpression
        {$$ = yy.node.BinaryExpression($2, $1, $3);}
    | MultiplicativeExpression '/' PrefixExpression
        {$$ = yy.node.BinaryExpression($2, $1, $3);}
    | MultiplicativeExpression '%' PrefixExpression
        {$$ = yy.node.BinaryExpression($2, $1, $3);}
    ;

PrefixExpression
    : PostfixExpression
        {$$ = $1;}
    | '-' PrefixExpression
        {$$ = yy.node.UnaryExpression($1, [$1]);}
    ;

PostfixExpression
    : PrimaryExpression
        {$$ = $1;}
    | PostfixExpression '(' ')'
        {$$ = yy.node.CallExpression($1, []);}
    | PostfixExpression '(' CallArgumentList ')'
        {$$ = yy.node.CallExpression($1, $3);}
    ;

PrimaryExpression
    : LITERAL_NUMBER
        {$$ = yy.node.Literal(yytext);}
    | IDENTIFIER
        {$$ = yy.node.Identifier(yytext);}
    | ParanthesisExpression
        {$$ = $1;}
    | ArrayExpression
        {$$ = $1;}
    ;

ArrayExpression
    : '[' ']'
        {$$ = yy.node.BracketExpression([]);}
    | '[' Expression ']'
        {$$ = yy.node.BracketExpression($2);}
    | '[' ExpressionList ']'
        {$$ = yy.node.BracketExpression($2);}
    ;

ParanthesisExpression
    : '(' Expression ')'
        {$$ = $2;}
    ;

ExpressionList
    : Expression ',' Expression
        {$$ = [$1, $3];}
    | ExpressionList ',' Expression
        {
            $1.push($3);
            $$ = $1;
        }
    ;

/* END Expressions */

/* Subelements for Expressions */

LambdaParameterList
    : IDENTIFIER ',' IDENTIFIER
        {
            $$ = [
                yy.node.Identifier($1),
                yy.node.Identifier($3)
            ];
        }
    | LambdaParameterList ',' IDENTIFIER
        {
            $1.push(yy.node.Identifier($3));
            $$ = $1;
        }
    ;

CallArgumentList
    : Expression
        {$$ = [$1];}
    | CallArgumentList ',' Expression
        {
            $1.push($3);
            $$ = $1;
        }
    ;

/* END for Expressions */
